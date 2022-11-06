const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const PROTO_PATH = "./news.proto"

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService

const client = new NewsService(
    "localhost:50051",
    grpc.credentials.createInsecure()
)

client.getAllNews({}, (err, news) => {
    if (err) throw err;
    console.log(news)
})
