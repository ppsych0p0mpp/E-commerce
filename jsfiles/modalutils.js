export function manageModalAccessibility(modalId) {
    const modal = document.getElementById(modalId);
    const backgroundContent = document.querySelector('body'); // Or specific elements to block

    modal.addEventListener('show.bs.modal', () => {
        modal.removeAttribute('aria-hidden');
        modal.setAttribute('aria-modal', 'true');
        backgroundContent.setAttribute('inert', ''); // Block background content
        const focusableElement = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElement) {
            focusableElement.focus();
        }
    });

    modal.addEventListener('hide.bs.modal', () => {
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        backgroundContent.removeAttribute('inert'); // Restore background content
    });
}
