"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverNumber = process.env.SERVER_NUMBER;
const PORT = Number(`300${serverNumber}`);
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send(`Received req: ${JSON.stringify(req.headers, null, 2)}`);
});
app.listen(PORT, () => {
    console.log(`Replied with Hello Message from server ${serverNumber}, PORT: ${PORT}`);
});
//# sourceMappingURL=server.js.map