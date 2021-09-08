import { onMounted, h } from "vue-demi"
export const useConfirm = () => {
  onMounted(() => {
    const dialog = document.createElement('dialog')
    const hello = document.createTextNode('hello')
    dialog.appendChild(hello)
    document.body.appendChild(dialog)
  })
}

export const useNotification = () => {
  const notification = (title: string, options: NotificationOptions = {}) => {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        new Notification(title, options);
      }
    })
  }
  return notification
}
