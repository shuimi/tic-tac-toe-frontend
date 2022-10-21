type CronTask = () => void

export const cron = (task: CronTask, ms: number) => {
  let intervalId: NodeJS.Timer | null = null

  return {
    start: () => {
      intervalId = setInterval(task, ms)
    },
    stop: () => {
      if (intervalId != null) {
        clearInterval(intervalId)
      }
    },
  }
}
