import { factory, SequelizeAdapter } from 'factory-girl'

const adapter = new SequelizeAdapter()

factory.setAdapter(adapter)

export { factory }
