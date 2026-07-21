declare global {
  interface Window {
    cf?: {
      track?: (
        eventName: string
      ) => void;
    };
  }
}


export function initAnalytics() {


  const elements =
    document.querySelectorAll<HTMLElement>(
      "[data-analytics]"
    );


  elements.forEach((element) => {


    element.addEventListener(
      "click",
      () => {


        const eventName =
          element.dataset.analytics;


        if (!eventName) {
          return;
        }


        if (
          window.cf &&
          window.cf.track
        ) {


          window.cf.track(
            eventName
          );


        }


      }
    );


  });


}


// Run automatically when imported

if (
  typeof window !== "undefined"
) {

  initAnalytics();

}