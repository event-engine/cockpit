
/**
 * Copies the value provided to the clipboard
 *
 * @param value
 */
export const copyToClipboard = (value: string) => {
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = value;
    inputElement.style.position = 'static';
    inputElement.style.left = '-1000px';
    inputElement.style.top = '-1000px';

    document.body.append(inputElement);
    inputElement.select();
    document.execCommand('copy');

    inputElement.parentNode!.removeChild(inputElement);
};
