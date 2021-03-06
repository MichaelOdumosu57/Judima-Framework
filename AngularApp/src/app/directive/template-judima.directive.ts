import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appGoogleMaps]'
  })
  export class GoogleMapsDirective {

    @Input() googleMaps: any;
    extras: any;
    zChildren: any;
    subscriptions:Array<Subscription> = []

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {


        if (this.extras?.confirm === 'true') {


            //communicate with the python backend
            this.http.post(
                "http://localhost:3005",
                {},
                {
                    responseType: 'text',
                }
            )
            .subscribe({


                error: (error) => {


                    eventDispatcher({
                        event: 'resize',
                        element: window
                    })
                },
                next: (result: any) => {



                    eventDispatcher({
                        event: 'resize',
                        element: window
                    })
                }

            })
            //

        }

    }

    ngOnInit() {
        this.extras = this.googleMaps
        console.log(this.extras)
        if (this.extras?.confirm === 'true') {


            let mainSubscription = combineLatest([
                env.googleMaps.scriptLoaded.subject,
                this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            ])
            .subscribe((result) => {

                this.zChildren = this.ryber[this.extras.co.valueOf()].metadata.zChildren

            })
            this.subscriptions.push(mainSubscription)

        }
    }


	ngOnDestroy() {
		if (this.extras?.confirm === 'true') {
			this.subscriptions
			.forEach((x: any, i) => {
				try{
					x.unsubscribe()
				}
				catch(e){}

			})
			delete this.subscriptions
		}
	}

}

