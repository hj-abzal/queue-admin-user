import React from "react";
import ReactDOM from "react-dom";
import Toast, {ToastProps} from "./Toast";

export type ToasterType = 'error' | 'success' | 'warning'
interface ToastOptions {
    id?: string;
    title: string;
    duration?: number;
    type: ToasterType;
}

export class ToastManager {
    private containerRef: HTMLDivElement;
    private toasts: ToastProps[] = [];

    constructor() {
        const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
        const toastContainer = document.createElement("div") as HTMLDivElement;
        toastContainer.className='bottom-3 left-16 fixed flex flex-col w-64 z-50'
        toastContainer.id = "toast-container-main";
        body.insertAdjacentElement("beforeend", toastContainer);
        this.containerRef = toastContainer;
    }

    public show(options: ToastOptions): void {
        const toastId = Math.random().toString(36).substr(2, 9);
        const toast: ToastProps = {
            id: toastId,
            ...options, // if id is passed within options, it will overwrite the auto-generated one
            destroy: () => this.destroy(options.id ?? toastId),
        };

        this.toasts = [toast, ...this.toasts];
        this.render();
    }

    public destroy(id: string): void {
        this.toasts = this.toasts.filter((toast: ToastProps) => toast.id !== id);
        this.render();
    }

    private render(): void {
        const toastsList = this.toasts.map((toastProps: ToastProps) => (
            <Toast key={toastProps.id} {...toastProps} />
        ));
        ReactDOM.render(toastsList, this.containerRef);
    }
}

export const toast = new ToastManager();


export const showErrorToast = (message: string) => {
    toast.show({
        title: message,
        type: 'error',
        duration: 2000
    })
}

export const showSuccessToast = (message: string) => {
    toast.show({
        title: message,
        type: 'success',
        duration: 2000
    })
}

export const showWarningToast = (message: string) => {
    toast.show({
        title: message,
        type: 'warning',
        duration: 2000
    })
}