package com.altinity.clickhouse.sink.connector.metadata;

import com.clickhouse.data.format.BinaryStreamUtils;
import static com.clickhouse.data.format.BinaryStreamUtils.DATETIME64_MAX;
import static com.clickhouse.data.format.BinaryStreamUtils.DATETIME64_MIN;
import static java.time.Instant.from;
import static java.time.Instant.ofEpochMilli;

import java.time.Instant;
import java.time.ZoneId;

public class DataTypeRange
{

    // Set clickhouse-jdbc limits
    public static final Integer CLICKHOUSE_MIN_SUPPORTED_DATE32 = BinaryStreamUtils.DATE32_MIN;

    public static final Integer CLICKHOUSE_MAX_SUPPORTED_DATE32 = BinaryStreamUtils.DATE32_MAX;


    // DateTime
    public static final Instant CLICKHOUSE_MIN_SUPPORTED_DATETIME = from(ofEpochMilli
            (DATETIME64_MIN * 1000).atZone(ZoneId.of("UTC"))).plusNanos(DATETIME64_MIN * 1000 % 1_000);
    public static final Instant CLICKHOUSE_MAX_SUPPORTED_DATETIME = from(ofEpochMilli
            (DATETIME64_MAX * 1000).atZone(ZoneId.of("UTC")).withHour(23).withMinute(59).withSecond(59).withNano(999999999));


}
