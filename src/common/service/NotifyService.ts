import { useQuasar } from "quasar"

export const NotifyService = () => {
    const $q = useQuasar();
    
    function showErrorMessage(message: string) {
        $q.notify({
            position: "top-right",
            message: `<b>${message}</b>`,
            html: true,
            color: "red-5",
            actions: [{icon: "mdi-close-box", color: "white"}],
            textColor: "white",
            type: "negative",
        });
    }
    
    function showInfoMessage(message: string) {
        $q.notify({
            position: "top-right",
            message: `<b>${message}</b>`,
            html: true,
            color: "blue-5",
            actions: [{icon: "mdi-close-box", color: "white"}],
            textColor: "white",
            type: "info",
        });
    }
    
    function showWarnMessage(message: string) {
        $q.notify({
            position: "top-right",
            message: `<b>${message}</b>`,
            html: true,
            color: "yellow-5",
            actions: [{icon: "mdi-close-box", color: "white"}],
            textColor: "white",
            type: "warning",
        });
    }
    
    function showSuccessMessage(message: string) {
        $q.notify({
            position: "top-right",
            message: `<b>${message}</b>`,
            html: true,
            color: "green-5",
            actions: [{icon: "mdi-close-box", color: "white"}],
            textColor: "white",
            type: "positive",
        });
    }

    return {
        showErrorMessage,
        showInfoMessage,
        showWarnMessage,
        showSuccessMessage,
    }
}