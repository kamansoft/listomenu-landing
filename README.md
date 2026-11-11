# listomenu-landing

need to create a landing that works as sales funnel  to seel subscriptions to a solution i created ist collaed listomenu is basically a order system for small food business like  ffood truck   arepas kiosko   it allow to handle inventory   that discount automatically  from each product saled or prepared   products to be saled are related to a recipe and the recipe has the informatio about the amount of ingredientes you have consume toretically from inventory or stock also you mig create a production plan w in wich you from the amount of planne products to make or served you get an stimation of the amount of ingredients you need to buy 


 the idea is to lead them to a whatsapp chat preferably using whatsapp web    or mail if the user dosent wnat to chat 


this is the app laoyout guideline so the landing page must be graphically coherent also with the app 
# listo.menu layout guidelines




## Scope




Presentation only. Keep existing actions, fields, navigation, permissions, repositories, ordering, inventory and offline behavior unchanged.




## Applied standards




- Use a 4px spacing rhythm: 8px between related controls, 16px inside compact groups, 24px between sections and 32px between desktop regions.

- Use 32px desktop, 24px intermediate and 16px phone gutters; constrain working content to 1440px rather than stretching indefinitely.

- Keep adjacent operational regions on wide screens; stack them when their contents need more room. Preserve existing navigation and order-sheet behavior.

- Keep operational targets at least 44px, with comfortable gaps. Use existing accessible icon labels when text cannot fit.

- Allow translated labels and user content to wrap without displacing fixed-size controls. Keep wide comparison tables locally scrollable.

- Respect device safe areas and dynamic viewport height. Long overlays remain scrollable; order sheets keep their existing task-specific layout.

- Treat the receipt icon and two-line wordmark as one lockup: 44px overall height, 12px internal gap, aligned top and bottom, consistent clear space. Retain the existing icon, check-o and wording.




## References




- [Material adaptive breakpoints](https://m3.material.io/foundations/layout/breakpoints/overview)

- [Material layout density](https://m3.material.io/foundations/layout/grids-spacing/density)

- [Apple layout guidance](https://developer.apple.com/design/human-interface-guidelines/layout)

- [Apple button guidance](https://developer.apple.com/design/human-interface-guidelines/buttons)

- [WCAG 2.2 target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)

- [Nielsen Norman Group: bottom sheets](https://www.nngroup.com/articles/bottom-sheet/)

- [Nielsen Norman Group: modal dialogs](https://www.nngroup.com/articles/modal-nonmodal-dialog/)

- [Docusign brand lockup guidance](https://brand.docusign.com/logo)




These sources inform the layout; the specific spacing and brand proportions are listo.menu design decisions, not claims of universal compliance.


page should be  strictly vite and react based  static site to be served on cloudflare workers and page 

the app is called listo.menu

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ff4577b-e381-418f-9fd8-f13fb16a8976).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
