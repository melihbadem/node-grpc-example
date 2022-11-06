const grpc = require("@grpc/grpc-js")
const PROTO_PATH = "./news.proto"
const protoLoader = require("@grpc/proto-loader")

const options = { 
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options)
const newsProto = grpc.loadPackageDefinition(packageDefinition)

const news = [
    { id: "1", title: "Note 1", body: "Content 1", postImage: "Post image 1" },
    { id: "2", title: "Note 2", body: "Content 2", postImage: "Post image 2" }
];

const server = new grpc.Server()

server.addService(newsProto.NewsService.service, {
    getAllNews: (_, callback) => {
        callback(null, { news })
    },
    addNews: (call, callback) => {
        const _news = {id: Date.now(), ...call.request}
        news.push(_news)
        callback(null, _news)
    }
})

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) throw err;
        console.log("Server running at http://127.0.0.1:50051")
        server.start()
    }
)
