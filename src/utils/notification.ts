type NotificationType = {
  text: string;
  icon?: string;
  name: string;
  onClick?: () => void;
};
const notification = ({ text, name, icon, onClick }: NotificationType) => {
  const notification = new Notification(`Txing: ${name}`, {
    body: text,
    icon: icon,
  });
  notification.addEventListener("click", () => {
    onClick?.();
  });
};

export const notify = ({ text, name, icon, onClick }: NotificationType) => {
  switch (Notification.permission) {
    case "granted": {
      notification({ text, name, icon, onClick });
      break;
    }
    case "default": {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          notification({ text, name, icon, onClick });
        }
      });
    }
  }
};
