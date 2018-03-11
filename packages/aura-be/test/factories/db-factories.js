import fs from 'fs'
import Path from 'path'
import { factory } from './factory_helper.js'

const basename = Path.basename(module.filename)

const dbFactories = {}
const resolvePath  = (path) => {
  if(Path.normalize(path) !== Path.resolve(path)){
      let callerFilename = Utils.stack()[1].getFileName()
      let callerPath = Path.dirname(callerFilename);
      path = Path.resolve(callerPath, path);
    }
  return path
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') && file != 'factory_helper.js';
  })
  .forEach((file) => {
    let path = resolvePath(Path.join(__dirname, file))
    let factory = require(path);
    let factoryName = Object.keys(factory)[0]
    dbFactories[factoryName] = factory[factoryName]
});
factory.factories = dbFactories
module.exports = factory
