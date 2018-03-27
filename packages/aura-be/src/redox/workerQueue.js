import kue from 'kue'
import patientInformationHandler from './PatientInformationHandler'
const redis_config = {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    auth: process.env.REDIS_PASS
  }
}
const queue = kue.createQueue(redis_config)
queue.watchStuckJobs(6000)
queue.on('ready', () => {
  console.log('Queue up.')
})

queue.on('error', (err) => {
  console.error(err)
})

export const createRedoxInsertJob = (requestBody, done) => {
  queue.create('redoxInsert', { title: 'redoxInsert', requestBody })
    .priority('normal')
    .attempts(1)
    .save((err) => {
      if(done) {
        done(err)
      }
    })
}

queue.process('redoxInsert', 50, (job, done) => {
  patientInformationHandler(job.data.requestBody)
  .then((res) => { done() })
  .catch((err) => {
    console.error(err)
    done(err)
  })
})
