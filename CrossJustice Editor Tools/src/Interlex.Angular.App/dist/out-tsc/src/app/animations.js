import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
export var slideInAnimation = trigger('routeAnimations', [
    transition('* => Caselist, Register => Admin', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ]),
        query(':enter', [
            style({ left: '-100%' })
        ]),
        query(':leave', animateChild(), { optional: true }),
        group([
            query(':leave', [
                animate('300ms ease-out', style({ left: '100%' }))
            ], { optional: true }),
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%' }))
            ])
        ]),
        query(':enter', animateChild()),
    ]),
    transition('Caselist => *, Admin => Register', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ]),
        query(':enter', [
            style({ left: '100%' })
        ]),
        query(':leave', animateChild()),
        group([
            query(':leave', [
                animate('300ms ease-out', style({ left: '-100%' }))
            ]),
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%' }))
            ])
        ]),
        query(':enter', animateChild()),
    ])
]);
//# sourceMappingURL=animations.js.map