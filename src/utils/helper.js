export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    // set the loading text
    btn.textContent = loadingText;
    btn.disabled = true;
  } else {
    // set the not loading text
    btn.textContent = defaultText;
    btn.disabled = false;
  }
}
