"use strict";(self.webpackChunkclickhouse_sink_connector=self.webpackChunkclickhouse_sink_connector||[]).push([[605],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>y});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),i=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=i(e.components);return r.createElement(c.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),m=i(n),d=a,y=m["".concat(c,".").concat(d)]||m[d]||p[d]||s;return n?r.createElement(y,l(l({ref:t},u),{},{components:n})):r.createElement(y,l({ref:t},u))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,l=new Array(s);l[0]=d;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[m]="string"==typeof e?e:a,l[1]=o;for(var i=2;i<s;i++)l[i]=n[i];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4326:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>s,metadata:()=>o,toc:()=>i});var r=n(7462),a=(n(7294),n(3905));const s={},l=void 0,o={unversionedId:"doc/schema_registry",id:"doc/schema_registry",title:"schema_registry",description:"Confluent Schema Registry",source:"@site/docs/doc/schema_registry.md",sourceDirName:"doc",slug:"/doc/schema_registry",permalink:"/doc/schema_registry",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"mutable_data",permalink:"/doc/mutable_data"},next:{title:"setup",permalink:"/doc/setup"}},c={},i=[{value:"Confluent Schema Registry",id:"confluent-schema-registry",level:4},{value:"REST API to get schemas(Key)",id:"rest-api-to-get-schemaskey",level:4},{value:"REST API to get schemas(Value)",id:"rest-api-to-get-schemasvalue",level:4},{value:"REST API to get versions associated with schema.",id:"rest-api-to-get-versions-associated-with-schema",level:4},{value:"Alter Schema",id:"alter-schema",level:4},{value:"Check binlog",id:"check-binlog",level:4},{value:"Check the versions for subject",id:"check-the-versions-for-subject",level:3}],u={toc:i},m="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h4",{id:"confluent-schema-registry"},"Confluent Schema Registry"),(0,a.kt)("p",null,"REST API to get subjects"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'curl -X GET http://localhost:80801/subjects\n["SERVER5432-key",\n"SERVER5432-value",\n"SERVER5432.test.customers-key",\n"SERVER5432.test.customers-value",\n"SERVER5432.test.employees-key",\n"SERVER5432.test.employees-value",\n"SERVER5432.test.employees_predated-key",\n"SERVER5432.test.employees_predated-value"]\n')),(0,a.kt)("h4",{id:"rest-api-to-get-schemaskey"},"REST API to get schemas(Key)"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'curl -X GET  http://localhost:8081/schemas/ids/3\n{"schema":"{\\"type\\":\\"record\\",\\"name\\":\\"Key\\",\\"namespace\\":\\"SERVER5432.test.customers\\",\n\\"fields\\":[{\\"name\\":\\"customerNumber\\",\\"type\\":\\"int\\"}],\\"connect.name\\":\\"SERVER5432.test.customers.Key\\"}"}\n')),(0,a.kt)("h4",{id:"rest-api-to-get-schemasvalue"},"REST API to get schemas(Value)"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'curl -X GET  http://localhost:8081/schemas/ids/4\n{"schema":"{\\"type\\":\\"record\\",\\"name\\":\\"Envelope\\",\\"namespace\\":\\"SERVER5432.test.customers\\",\n\\"fields\\":[{\\"name\\":\\"before\\",\\"type\\":[\\"null\\",{\\"type\\":\\"record\\",\\"name\\":\\"Value\\",\n\\"fields\\":[{\\"name\\":\\"customerNumber\\",\\"type\\":\\"int\\"},{\\"name\\":\\"customerName\\",\\"type\\":\\"string\\"},\n{\\"name\\":\\"contactLastName\\",\\"type\\":\\"string\\"},{\\"name\\":\\"contactFirstName\\",\\"type\\":\\"string\\"},\n{\\"name\\":\\"phone\\",\\"type\\":\\"string\\"},{\\"name\\":\\"addressLine1\\",\\"type\\":\\"string\\"},\n{\\"name\\":\\"addressLine2\\",\\"type\\":[\\"null\\",\\"string\\"],\\"default\\":null},\n{\\"name\\":\\"city\\",\\"type\\":\\"string\\"},\n{\\"name\\":\\"state\\",\\"type\\":[\\"null\\",\\"string\\"],\\"default\\":null},\n{\\"name\\":\\"postalCode\\",\\"type\\":[\\"null\\",\\"string\\"],\\"default\\":null},\n{\\"name\\":\\"country\\",\\"type\\":\\"string\\"},\n{\\"name\\":\\"salesRepEmployeeNumber\\",\\"type\\":[\\"null\\",\\"int\\"],\\"default\\":null},\n{\\"name\\":\\"creditLimit\\",\\\n"type\\":[\\"null\\",{\\"type\\":\\"bytes\\",\\"scale\\":2,\\"precision\\":10,\n\\"connect.version\\":1,\\"connect.parameters\\":{\\"scale\\":\\"2\\",\n\\"connect.decimal.precision\\":\\"10\\"},\n\\"connect.name\\":\\"org.apache.kafka.connect.data.Decimal\\",\\"logicalType\\":\\"decimal\\"}],\\"default\\":null}],\n\\"connect.name\\":\\"SERVER5432.test.customers.Value\\"}],\\"default\\":null},\n{\\"name\\":\\"after\\",\\"type\\":[\\"null\\",\\"Value\\"],\\"default\\":null},{\\"name\\":\\"source\\",\\\n"type\\":{\\"type\\":\\"record\\",\\"name\\":\\"Source\\",\\"namespace\\":\\"io.debezium.connector.mysql\\",\\\n"fields\\":[{\\"name\\":\\"version\\",\\"type\\":\\"string\\"},{\\"name\\":\\"connector\\",\\"type\\":\\"string\\"},{\\"name\\":\\"name\\",\\"type\\":\\"string\\"},{\\"name\\":\\"ts_ms\\",\\"type\\":\\"long\\"},{\\"name\\":\\"snapshot\\",\\"type\\":[{\\"type\\":\\"string\\",\\"connect.version\\":1,\\"connect.parameters\\":{\\"allowed\\":\\"true,last,false,incremental\\"},\\"connect.default\\":\\"false\\",\\"connect.name\\":\\"io.debezium.data.Enum\\"},\\"null\\"],\\"default\\":\\"false\\"},{\\"name\\":\\"db\\",\\"type\\":\\"string\\"},{\\"name\\":\\"sequence\\",\\"type\\":[\\"null\\",\\"string\\"],\\"default\\":null},{\\"name\\":\\"table\\",\\"type\\":[\\"null\\",\\"string\\"],\\"default\\":null},{\\"name\\":\\"server_id\\",\\"type\\":\\"long\\"},{\\"name\\":\\"gtid\\",\\"type\\":[\\"null\\",\\"string\\"],\\"default\\":null},{\\"name\\":\\"file\\",\\"type\\":\\"string\\"},{\\"name\\":\\"pos\\",\\"type\\":\\"long\\"},{\\"name\\":\\"row\\",\\"type\\":\\"int\\"},{\\"name\\":\\"thread\\",\\"type\\":[\\"null\\",\\"long\\"],\\"default\\":null},{\\"name\\":\\"query\\",\\"type\\":[\\"null\\",\\"string\\"],\\"default\\":null}],\\"connect.name\\":\\"io.debezium.connector.mysql.Source\\"}},{\\"name\\":\\"op\\",\\"type\\":\\"string\\"},{\\"name\\":\\"ts_ms\\",\\"type\\":[\\"null\\",\\"long\\"],\\"default\\":null},{\\"name\\":\\"transaction\\",\\"type\\":[\\"null\\",{\\"type\\":\\"record\\",\\"name\\":\\"ConnectDefault\\",\\"namespace\\":\\"io.confluent.connect.avro\\",\\"fields\\":[{\\"name\\":\\"id\\",\\"type\\":\\"string\\"},{\\"name\\":\\"total_order\\",\\"type\\":\\"long\\"},{\\"name\\":\\"data_collection_order\\",\\"type\\":\\"long\\"}]}],\\"default\\":null}],\\"connect.name\\":\\"SERVER5432.test.customers.Envelope\\"}"}\n')),(0,a.kt)("h4",{id:"rest-api-to-get-versions-associated-with-schema"},"REST API to get versions associated with schema."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},' curl -X GET http://localhost:8081/schemas/ids/4/versions\n[{"subject":"SERVER5432.test.customers-value","version":1}]\n')),(0,a.kt)("h4",{id:"alter-schema"},"Alter Schema"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"alter table test.customers drop column country\n")),(0,a.kt)("h4",{id:"check-binlog"},"Check binlog"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"}," show binlog events in 'mysql-bin.000003';\n+------------------+-----+----------------+-----------+-------------+------------------------------------------------------------------------------------------------------------------------------------------+\n| Log_name         | Pos | Event_type     | Server_id | End_log_pos | Info                                                                                                                                     |\n+------------------+-----+----------------+-----------+-------------+------------------------------------------------------------------------------------------------------------------------------------------+\n| mysql-bin.000003 |   4 | Format_desc    |       268 |         126 | Server ver: 8.0.30, Binlog ver: 4                                                                                                        |\n| mysql-bin.000003 | 126 | Previous_gtids |       268 |         197 | 83109c79-2912-11ed-b91f-0242ac150007:1-56                                                                                                |\n| mysql-bin.000003 | 197 | Gtid           |       268 |         276 | SET @@SESSION.GTID_NEXT= '83109c79-2912-11ed-b91f-0242ac150007:57'                                                                       |\n| mysql-bin.000003 | 276 | Query          |       268 |         474 | use `test`; /* ApplicationName=DBeaver 21.2.1 - SQLEditor <Script-5.sql> */ alter table test.customers drop column country /* xid=623 */ |\n+------------------+-----+----------------+-----------+-------------+------------------------------------------------------------------------------------------------------------------------------------------+\n")),(0,a.kt)("h3",{id:"check-the-versions-for-subject"},"Check the versions for subject"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'curl -X GET http://localhost:8081/schemas/ids/4/versions\n[{"subject":"SERVER5432.test.customers-value","version":1}\n')))}p.isMDXComponent=!0}}]);