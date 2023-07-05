
import path from 'path';
import { promises as fs } from 'fs';
export default async function Browse(req, res) {
    const filePath = path.join(process.cwd(), 'submodules/SimpleCip54Viewer/template/index.html');
    //Read the json data file data.json
    const fileContents = await fs.readFile(filePath, 'utf8');
    res.status(200).json({file:fileContents});
}