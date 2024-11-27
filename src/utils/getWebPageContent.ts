export async function getWebPageContent(): Promise<string | undefined>{
    const [tab] = await chrome.tabs.query({ active: true });
    const summary = await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'b', 'p'];

          const contentElements = document.querySelectorAll(allowedTags.join(', '));

          return Array.from(contentElements)
            .filter((el) => el.tagName !== 'A' && !el.closest('a'))
            .map((el) => (el as HTMLElement).innerText)
            .join(' ');
        },
      });

    return summary[0].result;
}