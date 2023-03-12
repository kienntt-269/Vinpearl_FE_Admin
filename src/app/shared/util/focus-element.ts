export function focusElement(selector: any) {
    const element = document.querySelector(selector);
  
    if (element) {
      setTimeout(() => {
        element.focus();
      }, 100);
    }
  }