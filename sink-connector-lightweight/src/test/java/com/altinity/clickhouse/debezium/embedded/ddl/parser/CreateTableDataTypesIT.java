package com.altinity.clickhouse.debezium.embedded.ddl.parser;

import com.altinity.clickhouse.debezium.embedded.cdc.DebeziumChangeEventCapture;
import com.altinity.clickhouse.debezium.embedded.parser.SourceRecordParserService;
import com.altinity.clickhouse.sink.connector.db.BaseDbWriter;
import org.apache.log4j.BasicConfigurator;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.containers.wait.strategy.HttpWaitStrategy;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import java.sql.ResultSet;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicReference;

@Testcontainers
public class CreateTableDataTypesIT extends DDLBaseIT {

    @BeforeEach
    public void startContainers() throws InterruptedException {
        mySqlContainer = new MySQLContainer<>(DockerImageName.parse("docker.io/bitnami/mysql:latest")
                .asCompatibleSubstituteFor("mysql"))
                .withDatabaseName("employees").withUsername("root").withPassword("adminpass")
                .withInitScript("data_types.sql")
                .withExtraHost("mysql-server", "0.0.0.0")
                .waitingFor(new HttpWaitStrategy().forPort(3306));

        BasicConfigurator.configure();
        mySqlContainer.start();
        clickHouseContainer.start();
        Thread.sleep(15000);
    }

    @Test
    public void testCreateTable() throws Exception {
        AtomicReference<DebeziumChangeEventCapture> engine = new AtomicReference<>();

        ExecutorService executorService = Executors.newFixedThreadPool(1);
        executorService.execute(() -> {
            try {

                Properties props = getDebeziumProperties();
                props.setProperty("database.include.list", "datatypes");
                props.setProperty("clickhouse.server.database", "datatypes");

                engine.set(new DebeziumChangeEventCapture());
                engine.get().setup(getDebeziumProperties(), new SourceRecordParserService(),
                        new MySQLDDLParserService());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });

        Thread.sleep(30000);


        BaseDbWriter writer = new BaseDbWriter(clickHouseContainer.getHost(), clickHouseContainer.getFirstMappedPort(),
                "employees", clickHouseContainer.getUsername(), clickHouseContainer.getPassword(), null);

        Map<String, String> decimalTable = writer.getColumnsDataTypesForTable("numeric_types_DECIMAL_65_30");
        Map<String, String> dateTimeTable = writer.getColumnsDataTypesForTable("temporal_types_DATETIME6");
        Map<String, String> timestampTable = writer.getColumnsDataTypesForTable("temporal_types_TIMESTAMP6");

        // Validate all decimal records.
        Assert.assertTrue(decimalTable.get("Type").equalsIgnoreCase("String"));
        Assert.assertTrue(decimalTable.get("Minimum_Value").equalsIgnoreCase("Decimal(65, 30)"));
        Assert.assertTrue(decimalTable.get("Zero_Value").equalsIgnoreCase("Decimal(65, 30)"));
        Assert.assertTrue(decimalTable.get("Maximum_Value").equalsIgnoreCase("Decimal(65, 30)"));


        // Validate dateTime64 records.
        Assert.assertTrue(dateTimeTable.get("Type").equalsIgnoreCase("String"));
        Assert.assertTrue(dateTimeTable.get("Minimum_Value").equalsIgnoreCase("DateTime64(3)"));
        Assert.assertTrue(dateTimeTable.get("Mid_Value").equalsIgnoreCase("DateTime64(3)"));
        Assert.assertTrue(dateTimeTable.get("Maximum_Value").equalsIgnoreCase("DateTime64(3)"));
        Assert.assertTrue(dateTimeTable.get("Null_Value").equalsIgnoreCase("Nullable(DateTime64(3))"));

        // Validate timestamp records
        Assert.assertTrue(timestampTable.get("Type").equalsIgnoreCase("String"));
        Assert.assertTrue(timestampTable.get("Minimum_Value").equalsIgnoreCase("DateTime64(3)"));
        Assert.assertTrue(timestampTable.get("Mid_Value").equalsIgnoreCase("DateTime64(3)"));
        Assert.assertTrue(timestampTable.get("Maximum_Value").equalsIgnoreCase("DateTime64(3)"));
        Assert.assertTrue(timestampTable.get("Null_Value").equalsIgnoreCase("Nullable(DateTime64(3))"));

        writer.getConnection().close();
        //Thread.sleep(10000);

         writer = new BaseDbWriter(clickHouseContainer.getHost(), clickHouseContainer.getFirstMappedPort(),
                "employees", clickHouseContainer.getUsername(), clickHouseContainer.getPassword(), null);
        // Validate temporal_types_DATE data.
        ResultSet dateResult = writer.executeQueryWithResultSet("select * from temporal_types_DATE");

        while(dateResult.next()) {
            Assert.assertTrue(dateResult.getDate("Minimum_Value").toString().equalsIgnoreCase("1925-01-01"));
            Assert.assertTrue(dateResult.getDate("Mid_Value").toString().equalsIgnoreCase("2022-09-29"));
            Assert.assertTrue(dateResult.getDate("Maximum_Value").toString().equalsIgnoreCase("2283-11-11"));
        }
        // Validate temporal_types_DATETIME data.
        ResultSet dateTimeResult = writer.executeQueryWithResultSet("select * from temporal_types_DATETIME");

        while(dateTimeResult.next()) {
            System.out.println("DATE TIME");
            Assert.assertTrue(dateTimeResult.getTimestamp("Minimum_Value").toString().equalsIgnoreCase("1925-01-01 00:00:00.0"));
            Assert.assertTrue(dateTimeResult.getTimestamp("Mid_Value").toString().equalsIgnoreCase("2022-09-29 01:47:46.0"));
            Assert.assertTrue(dateTimeResult.getTimestamp("Maximum_Value").toString().equalsIgnoreCase("2283-11-11 23:59:59.999"));
        }

        // DATETIME1
        ResultSet dateTimeResult1 = writer.executeQueryWithResultSet("select * from temporal_types_DATETIME1");
        while(dateTimeResult1.next()) {
            System.out.println("DATE TIME 1");

            Assert.assertTrue(dateTimeResult1.getTimestamp("Minimum_Value").toString().equalsIgnoreCase("1925-01-01 00:00:00.0"));
            Assert.assertTrue(dateTimeResult1.getTimestamp("Mid_Value").toString().equalsIgnoreCase("2022-09-29 01:48:25.1"));
            Assert.assertTrue(dateTimeResult1.getTimestamp("Maximum_Value").toString().equalsIgnoreCase("2283-11-11 23:59:59.999"));
        }

        // DATETIME2
        ResultSet dateTimeResult2 = writer.executeQueryWithResultSet("select * from temporal_types_DATETIME2");
        while(dateTimeResult2.next()) {
            System.out.println("DATE TIME 2");

            Assert.assertTrue(dateTimeResult2.getTimestamp("Minimum_Value").toString().equalsIgnoreCase("1925-01-01 00:00:00.0"));
            Assert.assertTrue(dateTimeResult2.getTimestamp("Mid_Value").toString().equalsIgnoreCase("2022-09-29 01:49:05.12"));
            Assert.assertTrue(dateTimeResult2.getTimestamp("Maximum_Value").toString().equalsIgnoreCase("2283-11-11 23:59:59.999"));
        }

        // DATETIME3
        ResultSet dateTimeResult3 = writer.executeQueryWithResultSet("select * from employees.temporal_types_DATETIME3");
        while(dateTimeResult3.next()) {
            System.out.println("DATE TIME 3");

            System.out.println(dateTimeResult3.getTimestamp("Mid_Value").toString());
            System.out.println(dateTimeResult3.getTimestamp("Maximum_Value").toString());
            System.out.println(dateTimeResult3.getTimestamp("Minimum_Value").toString());

            Assert.assertTrue(dateTimeResult3.getTimestamp("Mid_Value").toString().equalsIgnoreCase("2022-09-29 01:49:22.123"));
            Assert.assertTrue(dateTimeResult3.getTimestamp("Maximum_Value").toString().equalsIgnoreCase("2283-11-11 23:59:59.999"));
            Assert.assertTrue(dateTimeResult3.getTimestamp("Minimum_Value").toString().equalsIgnoreCase("1925-01-01 00:00:00.0"));
        }


        // DATETIME4
        ResultSet dateTimeResult4 = writer.executeQueryWithResultSet("select * from employees.temporal_types_DATETIME4");
        while(dateTimeResult4.next()) {
            System.out.println("DATE TIME 4");

            System.out.println(dateTimeResult4.getTimestamp("Mid_Value").toString());
            System.out.println(dateTimeResult4.getTimestamp("Maximum_Value").toString());
            System.out.println(dateTimeResult4.getTimestamp("Minimum_Value").toString());

            Assert.assertTrue(dateTimeResult4.getTimestamp("Mid_Value").toString().equalsIgnoreCase("2022-09-29 01:50:12.123"));
            Assert.assertTrue(dateTimeResult4.getTimestamp("Maximum_Value").toString().equalsIgnoreCase("2283-11-11 23:59:59.999"));
            Assert.assertTrue(dateTimeResult4.getTimestamp("Minimum_Value").toString().equalsIgnoreCase("1925-01-01 00:00:00.0"));

        }


        // DATETIME5
        ResultSet dateTimeResult5 = writer.executeQueryWithResultSet("select * from employees.temporal_types_DATETIME5");
        while(dateTimeResult5.next()) {
            System.out.println("DATE TIME 5");

            System.out.println(dateTimeResult5.getTimestamp("Mid_Value").toString());
            System.out.println(dateTimeResult5.getTimestamp("Maximum_Value").toString());
            System.out.println(dateTimeResult5.getTimestamp("Minimum_Value").toString());

            Assert.assertTrue(dateTimeResult5.getTimestamp("Mid_Value").toString().equalsIgnoreCase("2022-09-29 01:50:28.123"));
            Assert.assertTrue(dateTimeResult5.getTimestamp("Maximum_Value").toString().equalsIgnoreCase("2283-11-11 23:59:59.999"));
            Assert.assertTrue(dateTimeResult5.getTimestamp("Minimum_Value").toString().equalsIgnoreCase("1925-01-01 00:00:00.0"));

        }

        // DATETIME6
        ResultSet dateTimeResult6 = writer.executeQueryWithResultSet("select * from employees.temporal_types_DATETIME6");
        while(dateTimeResult6.next()) {
            System.out.println("DATE TIME 6");

            System.out.println(dateTimeResult6.getTimestamp("Mid_Value").toString());
            System.out.println(dateTimeResult6.getTimestamp("Maximum_Value").toString());
            System.out.println(dateTimeResult6.getTimestamp("Minimum_Value").toString());

            //Assert.assertTrue(dateTimeResult6.getTimestamp("Mid_Value").toString().equalsIgnoreCase("2022-09-29 01:50:56.123"));
            Assert.assertTrue(dateTimeResult6.getTimestamp("Maximum_Value").toString().equalsIgnoreCase("2283-11-11 23:59:59.999"));
            Assert.assertTrue(dateTimeResult6.getTimestamp("Minimum_Value").toString().equalsIgnoreCase("1925-01-01 00:00:00.0"));

        }

        if(engine.get() != null) {
            engine.get().stop();
        }
        // Files.deleteIfExists(tmpFilePath);
        executorService.shutdown();

        writer.getConnection().close();
    }
}