<!--<template>-->
<!--  <Viewer-->
<!--    id="viewerIds"-->
<!--    :locale="zhHans"-->
<!--    :value="value"-->
<!--    :plugins="pluginsList"-->
<!--  />-->
<!--</template>-->
<!--<script setup lang="ts">-->
<!--import { reactive, toRefs, markRaw, onMounted, nextTick, ref } from "vue";-->
<!--import { Viewer } from "@bytemd/vue-next";-->
<!--import gfm from "@bytemd/plugin-gfm";-->
<!--import gemoji from "@bytemd/plugin-gemoji";-->
<!--import highlight from "@bytemd/plugin-highlight"; // 代码高亮-->
<!--import frontmatter from "@bytemd/plugin-frontmatter"; // 解析前题-->
<!--import mediumZoom from "@bytemd/plugin-medium-zoom"; // 缩放图片-->
<!--import breaks from "@bytemd/plugin-breaks";-->
<!--import zhHans from "bytemd/locales/zh_Hans.json";-->
<!--import "bytemd/dist/index.css";-->
<!--import "juejin-markdown-themes/dist/juejin.min.css"; // 掘金同款样式-->
<!--// 插件-->
<!--const pluginsList = [-->
<!--  gfm(),-->
<!--  gemoji(),-->
<!--  highlight(),-->
<!--  frontmatter(),-->
<!--  mediumZoom(),-->
<!--  breaks(),-->
<!--];-->
<!--// 数据初始化-->
<!--// const state = reactive({-->
<!--//   value: "",-->
<!--//   plugins: markRaw(pluginsList),-->
<!--//   zh: zhHans,-->
<!--// });-->
<!--// 模拟数据-->
<!--const value = ref(-->
<!--  "![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09718f224c5a4a1eb8121b68509748d8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1080&h=810&s=1839422&e=png&b=131b22)\n" +-->
<!--    "# ES 简介\n" +-->
<!--    "ES 是一个开源的**高扩展**的**分布式全文搜索引擎**，是整个 ElasticStack 技术栈的核心。它可以近乎实时的存储、检索数据；本身扩展性很好，可以扩展到上百台服务器，处理 PB 级别的数据。目前市面上很多知名平台都在使用ES!  \n" +-->
<!--    "今天我们一起来了解一下ES文档操作的具体过程吧！\n" +-->
<!--    "# 前置知识\n" +-->
<!--    "为了更好地了解接下来的内容，我们先来熟悉一下ES中分片相关的概念： \n" +-->
<!--    "\n" +-->
<!--    "- **分片**  \n" +-->
<!--    "假设一个索引不对其进行拆分，而是存储在单个节点上，那么，当数据量大到一定程度时，将没有任何机器可以单独存储如此庞大的数据量。因此，我们很容易可以想到采用**分布式存储**的方式，将数据都分散到不同的机器上，实际ES也是这样做的。  \n" +-->
<!--    "为了解决这个问题，Elasticsearch 提供了将索引划分成多份的能力，每一份就称之为**分片**，当我们创建索引时，可以指定想要的分片数量。注意，每个分片本身也是一个功能完善并且独立的“索引”，这个“索引”可以被放置到集群中的任何节点上。\n" +-->
<!--    "- **副本**  \n" +-->
<!--    "分片解决的只是单台机器存储数据量能力有限的问题，并没有解决数据安全的问题，假设我们每个分片只有一个份，那当我们某台机器宕机或者磁盘损坏时，那存储于该台机器的分片岂不是凉凉了？因此Elasticsearch 允许我们创建分片的一份或多份拷贝，这些拷贝叫做**复制分片(副本)**，副本分片将会存储在不同于主分片的节点上，以此来提高安全性。\n" +-->
<!--    "\n" +-->
<!--    "# ES 写过程\n" +-->
<!--    "\n" +-->
<!--    "![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ae0c77154fa408390eb156a61970b8a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=634&h=312&s=63644&e=png&b=fdfdfd)\n" +-->
<!--    "1. 如图所示，假设客户端把**新建/索引/删除**请求发送给了Node1，称Node1为协调节点，Node1接收到请求后，先会通过文档的_id值确定其属于哪个分片，本示例确定其在0分片，因此Node1就把请求转发到Node3节点，因为0主分片正位于Node3节点。\n" +-->
<!--    "2. Node3节点接收到请求后，会对请求执行处理，处理成功再把请求并行转发到Node1和Node2的副本分片上\n" +-->
<!--    "3. 待所有的副本分片都报告成功后，Node3会向协调节点Node1报告成功，协调节点再向客户端报告成功。\n" +-->
<!--    "# ES 读过程\n" +-->
<!--    "\n" +-->
<!--    "![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8debcd1da974a1fbfdc2cbdc6dcaee6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=701&h=262&s=64869&e=png&b=faf9f7)\n" +-->
<!--    "1. 客户端先把读请求发送给协调节点Node1\n" +-->
<!--    "2. Node1接收到请求后，先通过_id确定目标文档所在的分片，确定在0分片上后，由于0分片在三个节点上都有分布，因此进行负载均衡，选择一个节点来处理本次请求，这次选择了Node2节点，因此本请求转发到Node2节点上\n" +-->
<!--    "3. Node2接受到请求后，查找到目标文档，将文档先返回给协调节点Node1，随即Node1把数据返回给客户端  \n" +-->
<!--    " **注：** 在处理读取请求时，协调结点在每次请求的时候，会通过轮询所有的副本分片来达到负载均衡。\n" +-->
<!--    "\n" +-->
<!--    "# ES 更新过程\n" +-->
<!--    "\n" +-->
<!--    "![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4b5a40126e54333bee9301fb9ce487a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=769&h=315&s=71910&e=png&b=fdfdfd)\n" +-->
<!--    "1. 客户端向协调节点Node1发送更新请求\n" +-->
<!--    "2. 同读写操作，Node1会把请求转发到目标文档所在的主分片上（本次在Node3上）\n" +-->
<!--    "3. Node3接收到请求后，会检索到目标文档，然后修改_source字段中JSON，并且尝试重新索引新的文档，如果这时候检测到文档已经被修改，会重试步骤3（CAS的思想），超过retry_on_conflict次后会放弃\n" +-->
<!--    "4. 如果Node3更新文档成功后，会把新版本的文档转发到Node2和Node1，Node2以及Node1再重新建立索引，所有副本操作成功后，Node3会向协调节点报告成功，协调节点向客户端报告成功。   \n" +-->
<!--    "**注：** 主分片在给副本分片转发更新时，不是直接转发更新请求，而是转发整个新版本的文档，这样做主要因为在复杂的网络环境下，我们不能保证请求报文到达的顺序，若我们直接转发更新请求，那么在请求到达顺序错乱的情况下，就会产生写丢失的问题。\n" +-->
<!--    "# 多文档操作流程\n" +-->
<!--    "## mget（Multi Get）操作 \n" +-->
<!--    "- **示例**  \n" +-->
<!--    "```java \n" +-->
<!--    "GET /{index}/_mget \n" +-->
<!--    "{ \n" +-->
<!--    '    "docs": [ \n' +-->
<!--    "        { \n" +-->
<!--    '            "_index": "index1",\n' +-->
<!--    '            "_type": "type1", \n' +-->
<!--    '            "_id": "1" \n' +-->
<!--    "        }, \n" +-->
<!--    "        { \n" +-->
<!--    '            "_index": "index2", \n' +-->
<!--    '            "_type": "type2", \n' +-->
<!--    '            "_id": "2" \n' +-->
<!--    "        }, \n" +-->
<!--    "         ... \n" +-->
<!--    "    ]\n" +-->
<!--    "}\n" +-->
<!--    "```\n" +-->
<!--    "- **执行流程**\n" +-->
<!--    "1. 客户端会先向协调节点Node1发送mget请求\n" +-->
<!--    "2. Node1接收到请求后，根据目标文档所在分片为各分片构造多文件获取请求，然后向各分片发送请求\n" +-->
<!--    "3. 待Node1拿到各节点的响应后，会把各分片的查询结果进行封装，把最终的响应结果返回给客户端 \n" +-->
<!--    "\n" +-->
<!--    "## Bulk API \n" +-->
<!--    "- **示例** \n" +-->
<!--    "```java\n" +-->
<!--    "POST /_bulk \n" +-->
<!--    "{ \n" +-->
<!--    '    "index" : { "_index" : "myindex", "_id" : "1" } \n' +-->
<!--    "} \n" +-->
<!--    "{ \n" +-->
<!--    '    "field1" : "value1" \n' +-->
<!--    "} \n" +-->
<!--    "{ \n" +-->
<!--    '    "update" : { "_index" : "myindex", "_id" : "2" } \n' +-->
<!--    "} \n" +-->
<!--    "{ \n" +-->
<!--    '    "doc" : { "field2" : "value2" } \n' +-->
<!--    "} \n" +-->
<!--    "{ \n" +-->
<!--    '    "delete" : { "_index" : "myindex", "_id" : "3" } \n' +-->
<!--    "}\n" +-->
<!--    "```\n" +-->
<!--    "- **执行流程**\n" +-->
<!--    "1. 客户端先向协调节点Node1发送bulk请求\n" +-->
<!--    "2. Node1为每个节点构造批量请求，随即把这些请求发送到各主分片所在的节点上\n" +-->
<!--    "3. 各节点按顺序执行批量请求中的操作，执行完成每个操作，会把更改同步到副分片当中，然后继续执行下一个操作。当所有副本分片报告所有操作均已完成后，该节点向协调节点报告成功\n" +-->
<!--    "4. 所有操作均已完成后，协调节点将所有响应整理封装并返回给客户端\n" +-->
<!--    "# 总结\n" +-->
<!--    "今天主要阐述了ES中一些基本操作的执行流程，我们接下来会对ES其他内容进行展开，一起学习！  \n" +-->
<!--    "对于ES在项目中的应用，可以参考一下此项目：  \n" +-->
<!--    "[Txing组团-微服务](https://gitee.com/lemon_plus/txing)\n" +-->
<!--    "\n" +-->
<!--    "> 好啦 天下没有不散的宴席 今天就到这里啦 我们改天再会 谢谢！"-->
<!--);-->
<!--</script>-->

<template>
  <Viewer
    id="viewerIds"
    :value="postInfo.content"
    :plugins="plugins"
    :locale="zhHans"
  />
</template>

<script setup lang="ts">
import { Viewer } from "@bytemd/vue-next";
import { markRaw, ref } from "vue";
import { defineProps, withDefaults } from "vue";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import highlightssr from "@bytemd/plugin-highlight-ssr";
import math from "@bytemd/plugin-math";
import mathssr from "@bytemd/plugin-math-ssr";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
// CSS
import "bytemd/dist/index.css";
import "highlight.js/styles/default.css";
import "katex/dist/katex.css";
// import "juejin-markdown-themes/dist/juejin.min.css";
import "juejin-markdown-themes/dist/channing-cyan.min.css";
// 中文包
import zhHans from "bytemd/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import mathLocale from "@bytemd/plugin-math/locales/zh_Hans.json";
import mermaidLocale from "@bytemd/plugin-mermaid/locales/zh_Hans.json";

const plugins = [
  gfm(),
  highlight(),
  mediumZoom(),
  gemoji(),
  breaks(),
  frontmatter(),
  math(),
  mediumZoom(),
  mermaid(),
  // highlightssr(),
  // mathssr(),
  // Add more plugins here
];
let postInfo = ref<any>({
  id: 0,
  title: "",
  content:
    "![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09718f224c5a4a1eb8121b68509748d8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1080&h=810&s=1839422&e=png&b=131b22)\n" +
    "# ES 简介\n" +
    "ES 是一个开源的**高扩展**的**分布式全文搜索引擎**，是整个 ElasticStack 技术栈的核心。它可以近乎实时的存储、检索数据；本身扩展性很好，可以扩展到上百台服务器，处理 PB 级别的数据。目前市面上很多知名平台都在使用ES!  \n" +
    "今天我们一起来了解一下ES文档操作的具体过程吧！\n" +
    "# 前置知识\n" +
    "为了更好地了解接下来的内容，我们先来熟悉一下ES中分片相关的概念： \n" +
    "\n" +
    "- **分片**  \n" +
    "假设一个索引不对其进行拆分，而是存储在单个节点上，那么，当数据量大到一定程度时，将没有任何机器可以单独存储如此庞大的数据量。因此，我们很容易可以想到采用**分布式存储**的方式，将数据都分散到不同的机器上，实际ES也是这样做的。  \n" +
    "为了解决这个问题，Elasticsearch 提供了将索引划分成多份的能力，每一份就称之为**分片**，当我们创建索引时，可以指定想要的分片数量。注意，每个分片本身也是一个功能完善并且独立的“索引”，这个“索引”可以被放置到集群中的任何节点上。\n" +
    "- **副本**  \n" +
    "分片解决的只是单台机器存储数据量能力有限的问题，并没有解决数据安全的问题，假设我们每个分片只有一个份，那当我们某台机器宕机或者磁盘损坏时，那存储于该台机器的分片岂不是凉凉了？因此Elasticsearch 允许我们创建分片的一份或多份拷贝，这些拷贝叫做**复制分片(副本)**，副本分片将会存储在不同于主分片的节点上，以此来提高安全性。\n" +
    "\n" +
    "# ES 写过程\n" +
    "\n" +
    "![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ae0c77154fa408390eb156a61970b8a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=634&h=312&s=63644&e=png&b=fdfdfd)\n" +
    "1. 如图所示，假设客户端把**新建/索引/删除**请求发送给了Node1，称Node1为协调节点，Node1接收到请求后，先会通过文档的_id值确定其属于哪个分片，本示例确定其在0分片，因此Node1就把请求转发到Node3节点，因为0主分片正位于Node3节点。\n" +
    "2. Node3节点接收到请求后，会对请求执行处理，处理成功再把请求并行转发到Node1和Node2的副本分片上\n" +
    "3. 待所有的副本分片都报告成功后，Node3会向协调节点Node1报告成功，协调节点再向客户端报告成功。\n" +
    "# ES 读过程\n" +
    "\n" +
    "![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8debcd1da974a1fbfdc2cbdc6dcaee6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=701&h=262&s=64869&e=png&b=faf9f7)\n" +
    "1. 客户端先把读请求发送给协调节点Node1\n" +
    "2. Node1接收到请求后，先通过_id确定目标文档所在的分片，确定在0分片上后，由于0分片在三个节点上都有分布，因此进行负载均衡，选择一个节点来处理本次请求，这次选择了Node2节点，因此本请求转发到Node2节点上\n" +
    "3. Node2接受到请求后，查找到目标文档，将文档先返回给协调节点Node1，随即Node1把数据返回给客户端  \n" +
    " **注：** 在处理读取请求时，协调结点在每次请求的时候，会通过轮询所有的副本分片来达到负载均衡。\n" +
    "\n" +
    "# ES 更新过程\n" +
    "\n" +
    "![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4b5a40126e54333bee9301fb9ce487a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=769&h=315&s=71910&e=png&b=fdfdfd)\n" +
    "1. 客户端向协调节点Node1发送更新请求\n" +
    "2. 同读写操作，Node1会把请求转发到目标文档所在的主分片上（本次在Node3上）\n" +
    "3. Node3接收到请求后，会检索到目标文档，然后修改_source字段中JSON，并且尝试重新索引新的文档，如果这时候检测到文档已经被修改，会重试步骤3（CAS的思想），超过retry_on_conflict次后会放弃\n" +
    "4. 如果Node3更新文档成功后，会把新版本的文档转发到Node2和Node1，Node2以及Node1再重新建立索引，所有副本操作成功后，Node3会向协调节点报告成功，协调节点向客户端报告成功。   \n" +
    "**注：** 主分片在给副本分片转发更新时，不是直接转发更新请求，而是转发整个新版本的文档，这样做主要因为在复杂的网络环境下，我们不能保证请求报文到达的顺序，若我们直接转发更新请求，那么在请求到达顺序错乱的情况下，就会产生写丢失的问题。\n" +
    "# 多文档操作流程\n" +
    "## mget（Multi Get）操作 \n" +
    "- **示例**  \n" +
    "```java \n" +
    "GET /{index}/_mget \n" +
    "{ \n" +
    '    "docs": [ \n' +
    "        { \n" +
    '            "_index": "index1",\n' +
    '            "_type": "type1", \n' +
    '            "_id": "1" \n' +
    "        }, \n" +
    "        { \n" +
    '            "_index": "index2", \n' +
    '            "_type": "type2", \n' +
    '            "_id": "2" \n' +
    "        }, \n" +
    "         ... \n" +
    "    ]\n" +
    "}\n" +
    "```\n" +
    "- **执行流程**\n" +
    "1. 客户端会先向协调节点Node1发送mget请求\n" +
    "2. Node1接收到请求后，根据目标文档所在分片为各分片构造多文件获取请求，然后向各分片发送请求\n" +
    "3. 待Node1拿到各节点的响应后，会把各分片的查询结果进行封装，把最终的响应结果返回给客户端 \n" +
    "\n" +
    "## Bulk API \n" +
    "- **示例** \n" +
    "```java\n" +
    "POST /_bulk \n" +
    "{ \n" +
    '    "index" : { "_index" : "myindex", "_id" : "1" } \n' +
    "} \n" +
    "{ \n" +
    '    "field1" : "value1" \n' +
    "} \n" +
    "{ \n" +
    '    "update" : { "_index" : "myindex", "_id" : "2" } \n' +
    "} \n" +
    "{ \n" +
    '    "doc" : { "field2" : "value2" } \n' +
    "} \n" +
    "{ \n" +
    '    "delete" : { "_index" : "myindex", "_id" : "3" } \n' +
    "}\n" +
    "```\n" +
    "- **执行流程**\n" +
    "1. 客户端先向协调节点Node1发送bulk请求\n" +
    "2. Node1为每个节点构造批量请求，随即把这些请求发送到各主分片所在的节点上\n" +
    "3. 各节点按顺序执行批量请求中的操作，执行完成每个操作，会把更改同步到副分片当中，然后继续执行下一个操作。当所有副本分片报告所有操作均已完成后，该节点向协调节点报告成功\n" +
    "4. 所有操作均已完成后，协调节点将所有响应整理封装并返回给客户端\n" +
    "# 总结\n" +
    "今天主要阐述了ES中一些基本操作的执行流程，我们接下来会对ES其他内容进行展开，一起学习！  \n" +
    "对于ES在项目中的应用，可以参考一下此项目：  \n" +
    "[Txing组团-微服务](https://gitee.com/lemon_plus/txing)\n" +
    "\n" +
    "> 好啦 天下没有不散的宴席 今天就到这里啦 我们改天再会 谢谢！",
  thumbNum: 0,
  favourNum: 0,
  userId: "",
  createTime: "",
  updateTime: "",
  tagList: null,
  user: {
    id: 0,
    userName: "",
    userAvatar: "",
    userProfile: null,
    userRole: "",
    createTime: "",
    school: "",
    profession: "",
    workExperience: null,
    questionCount: 0,
    acceptedRate: 0,
    submitCount: 0,
    acceptedCount: 0,
    personSign: "",
  },
  commentNum: 0,
  coverImg: "",
  hasThumb: false,
  hasFavour: false,
});
</script>

<style scoped>
#viewerIds {
  max-width: 1280px;
  width: 60vw;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  /*padding-right: 10px;*/
  /*padding-left: 10px;*/
  padding: 20px 20px;
  flex: 1;
}
</style>
