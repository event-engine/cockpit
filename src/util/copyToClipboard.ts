
/**
 * Copies the value provided to the clipboard.
 * Sometimes it is necessary to append the temporary input to a specific element to make this work.
 *
 * @param value
 * @param appendTo
 */
export const copyToClipboard = (value: string, appendTo?: HTMLElement) => {
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = value;
    inputElement.style.position = 'fixed';
    inputElement.style.left = '-1000px';
    inputElement.style.top = '-1000px';

    (appendTo || document.body).append(inputElement);
    inputElement.select();
    document.execCommand('copy');

    inputElement.parentNode!.removeChild(inputElement);
};
