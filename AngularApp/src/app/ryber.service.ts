import { Injectable, VERSION,Renderer2,RendererFactory2 } from "@angular/core";
import { Observable, of, Subject, Subscription, BehaviorSubject, ReplaySubject, merge, combineLatest } from "rxjs";
// import { Router,RouterEvent } from "@angular/router";
import { zChildren, componentObject, numberParse, ryberUpdate, objectCopy } from "./customExports";
import { HttpClient } from "@angular/common/http";
import website from './website';
import { tap, last, catchError } from 'rxjs/operators'




@Injectable({
    providedIn: "root"
})
export class RyberService {

    private renderer2:Renderer2
    constructor(
        // private router:Router
        public http: HttpClient,
        private rendererFactory: RendererFactory2
    ) {

        //start renderer2
        this.renderer2 = rendererFactory.createRenderer(null, null);
        //
        // console.log("ryberservice constructor fires")

        let rUD = ((a) => {
            return (zConsist) => {
                return ryberUpdate.call(a, zConsist)
            }
        })(this)

        let zCTgen = function* generator() {
            var index = 0;
            while (true)
                yield index++;
        }()

        function zChildTemplate(devObj: { // objects for rUD calls custom to the dev and the website
            co?: string,
            mf?: any,
            options?: any
        }): any {

            let { co } = devObj


            let { mf } = devObj
            let { webVitals,columnDefs,rowData,webRTC,imageURL,latch,options,nestUnder,nest,nestGroup,printGroupType, printGroup, key, type, gap, stack, value, group, count, repeatable, newline, form, multipleGroup, refreshGroup, background, color, fonts, title, fontSize, italics, googleSheets, border } = mf
            let { left, top, height, width, split, next } = devObj.mf
            let component = { left, top, height, width, split, next }

			// support for custom attribute,property and css additons
            if (options === undefined) {
                options = {
					css:{},
					extend:{},
					judima:{}
				}
			}

			else{
				if(options.extend === undefined){
					options.extend = {}
				}
				if(options.css === undefined){
					options.css = {}
				}
				if(options.judima === undefined){
					options.judima = {}
				}
			}
			//




            let symbol: any = ""

            if (type === "new" || type === "body") {
                let sectionDefault: any = objectCopy(this.appCO0.metadata.ryber.sectionDefault)
                let section: any = {
                    gap: gap === undefined ? sectionDefault.gap : gap,               // if the gap is wildily bigger it wont stack appropraitely, make sure we gap approaitely
                    left: left === undefined ? sectionDefault.left : left,
                    width: width === undefined ? sectionDefault.width : width,
                    split: split === undefined ? sectionDefault.split : split,
                    stack: stack === undefined ? sectionDefault.stack : stack
				}
				let css ={
					height: "300px", //must always exit
					//expected to be a percent configureble for position in FPM logic
					width: "100%",
					top: "0px",
					//
					"background-color": background
				}
				css = {...css,...options.css}
                symbol = rUD({
                    co,
                    val:key.split("_").reverse()[0] + ' a_p_p_Board',
                    // ryber:this,
                    signature: title,
                    css,
                    extras: {
                        section,
                        type,
                        component,
                        appWebVitals:{
                            confirm:webVitals?.confirm,
                            co,
                        }
                    }
                })
            }

            else if (type === "title" || type === "heading") {

                let css = {
                    "z-index": 4,
                    display: "table",
                    "font-size": fontSize !== undefined ? fontSize + "px" : "54px",
                    "font-weight": italics,
                    'background-color': background,
                    color,
                    "font-family": fonts
                }

                css = {...css,...options.css}


                symbol = rUD({
                    co,
                    bool: 'h1',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Heading',
                    css,
                    extras: {
                        component,
                        multipleGroup,
                        deltaIndex: 1,
                        type
                    }
                })

            }

            else if (type === "input") {
                let extend: any = {
                    type: 'text',
                    placeholder: value,
                    form: 'myForm'
                }

                form?.required === undefined ? null : ((a) => { a.required = form?.required })(extend)
                let css = {
                    "z-index": 4,
                    // display:"table",
                    border,
                    "font-size": fontSize === undefined ? "30px" : fontSize + "px",
                    'background-color': background,
                    color,
                    "font-family": fonts,
                    "text-align": mf["text-align"]
                }

				css = {...css,...options.css}

                symbol = rUD({
                    co,
                    bool: 'i',
                    val: key.split("_").reverse()[0] + ' a_p_p_Input',
                    css,
                    extras: {
                        extend,
                        deltaIndex: 1,
                        appFocusFont: {
                            confirm: 'true',
                            fontSizeDefault: "32px",
                            mobileShrink: "true"
                        },
                        appInputHandle: {
							confirm: 'true',
							zSymbolNeeded:"true",
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value,
                            googleSheets,
                            link: form?.link
                        },
                        appLatch:{
                            confirm:latch === undefined ?"false":"true",
                            co,
							latch,
							zSymbolNeeded:"true",
                        },
                        appNest: {
                            confirm:nestGroup === undefined ? "false": "true",
                            co,
                            nestGroup,
                            nestUnder,
							nest,
							zSymbolNeeded:"true"
                        },
                        component,
                        multipleGroup,
                        type
                    }
                })
            }

            else if (type === "textbox") {
                let extend: any = {
                    type: 'text',
                    placeholder: value,
                    form: 'myForm',

                }

                form?.required === undefined ? null : ((a) => { a.required = form?.required })(extend)
                let css = {
                    "font-size": "27px",
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts
                }


				css = {...css,...options.css}

                symbol = rUD({
                    co,
                    bool: 'ta',
                    val: key.split("_").reverse()[0] + ' a_p_p_TextArea',
                    css,
                    extras: {
                        extend,
                        deltaIndex: 1,
                        appFocusFont: {
                            confirm: 'true',
                            fontSizeDefault: "32px",
                            mobileShrink: "true"
                        },
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
                        },
                        appInputHandle: {
                            confirm: 'true',
                            zSymbolNeeded:"true",
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value,
                            googleSheets,
                            link: form?.link
                        },
                        component,
                        multipleGroup,
                        type
                    }
                })
            }

            else if (type === "email") {
                let extend: any = {
                    type: 'email',
                    placeholder: value,
                    form: 'myForm',

                }
                form?.required === undefined ? null : ((a) => { a.required = form?.required })(extend)
                let css = {
                    "font-size": "32px",
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts
                }

				css = {...css,...options.css}

                symbol = rUD({
                    co,
                    bool: 'i',
                    val: key.split("_").reverse()[0] + ' a_p_p_Input',
                    css,
                    extras: {
                        extend,
                        deltaIndex: 1,
                        appFocusFont: {
                            confirm: 'true',
                            fontSizeDefault: "32px",
                            mobileShrink: "true"
                        },
                        appInputHandle: {
                            confirm: 'true',
                            zSymbolNeeded:"true",
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value,
                            googleSheets,
                            link: form?.link
                        },
                        component,
                        multipleGroup,
                        type
                    }
                })
            }

            else if (type === "date") {
                let extend: any = {
                    type: 'text',
                    placeholder: value,
                    form: 'myForm',
                }
                form?.required === undefined ? null : ((a) => { a.required = form?.required })(extend)
                let css = {
                    "font-size": "32px",
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts
                }
                css = {...css,...options.css}

                symbol = rUD({
                    co,
                    bool: 'i',
                    val: key.split("_").reverse()[0] + " a_p_p_Input",
                    css,
                    extras: {
                        extend,
                        deltaIndex: 1,
                        appFocusFont: {
                            confirm: 'true',
                            fontSizeDefault: "32px",
                            mobileShrink: "true"
                        },
                        appInputHandle: {
                            confirm: 'true',
                            zSymbolNeeded:"true",
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value,
                            googleSheets,
                            link: form?.link
                        },
                        appLatch:{
                            confirm:latch === undefined ?"false":"true",
                            co,
							latch,
							zSymbolNeeded:"true",
                        },
                        appNest: {
                            confirm:nestGroup === undefined ? "false": "true",
                            co,
                            nestGroup,
                            nestUnder,
							nest,
							zSymbolNeeded:"true"
                        },
                        component,
                        multipleGroup,
                        appDateClick: {
                            confirm: "true"
                        },
                        type
                    }
                })
            }

            else if (type === "text") {


                let css = {
                    "font-size": fontSize !== undefined ? fontSize + "px" : "30px",
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-weight": italics,
                    "font-family": fonts,
                    "text-align": devObj.mf["text-align"]
                }
                css = {...css,...options.css}

                symbol = rUD({
                    co,
                    bool: 'p',
                    val: key.split("_").reverse()[0] + '  a_p_p_Text',
                    text: value,
                    css,
                    extras: {
                        deltaIndex: 1,
                        component,
                        multipleGroup,
                        type,
                        appPrintFiles: {
                            printGroup,
                            type: printGroupType
                        },
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
                        },
                    }
                })
            }

            else if (type === "loading") {


                let css = {
                    "z-index": 4,
                    // 'background-color':background,
                    // color,
                    stroke: color,
                    "text-align": devObj.mf["text-align"]
                }


				css = {...css,...options.css}

                let extend = {
                    // mode:"indeterminate",
                    // color:"primary"
                }

                component.height = component?.height === undefined ? 100 : component.height
                component.width = component?.height === undefined ? 100 : component.height  // widht is not allowed here it will break the mat-spinner

                symbol = rUD({
                    co,
                    bool: 'mat-spinner',
                    val: key.split("_").reverse()[0],
                    css,
                    extras: {
                        deltaIndex: 1,
                        component,
                        multipleGroup,
                        type,
                        extend
                    }
                })
            }

            else if (type === "simpleTable") {


                let css = {
                    height: "250px",
                    width: "500px"
                }
				css = {...css,...options.css}

                let extend = {
                }

                symbol = rUD({
                    co,
                    bool: 'ag-grid',
                    val: key.split("_").reverse()[0],
                    css,
                    extras: {
                        deltaIndex: 1,
                        component,
                        multipleGroup,
                        type,
                        extend,
                        appAgGrid: {
                            co,
                            zSymbolNeeded:"true",
                            rowData: rowData || [],
                            columnDefs: columnDefs || [],
                            confirm: "true",
                            defaultColDef: {
                                resizable: true,
                                flex: 1,
                                suppressSizeToFit: true,
                            },
                        },
                        appNest: {
                            confirm:nestGroup === undefined ? "false": "true",
                            co,
                            nestGroup,
                            nestUnder,
							nest,
							zSymbolNeeded:"true"
                        }
                    }
                })
            }

            else if (type === "div") { // for now a better use of divs?


                let css = {
                    'background-color':background,
                    color,
                    overflow:"auto"
                }
                css = {...css,...options.css}

                let extend = {
				}

				let judima ={
					// figure out whether the zChild should be incoporated into judima formatting logic
					formatIgnore:(()=>{
						if([nestGroup,nestUnder].includes(undefined)){
							return "true"
						}
						return "false"
					})(),
					//
					...options.judima
				}


                symbol = rUD({
                    co,
                    bool: 'div',
                    val: key.split("_").reverse()[0]+ ' a_p_p_Nester',
                    css,
                    extras: {
						judima,
                        deltaIndex: 1,
                        component,
                        multipleGroup,
                        type,
                        extend,
                        appNest: {
                            confirm:nestGroup === undefined ? "false": "true",
                            co,
                            nestGroup,
                            nestUnder,
							nest,
							zSymbolNeeded:"true"
                        },
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
                        },
                    }
                })
            }

            else if (type === "sub-heading") {


                let css = {
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-weight": italics,
                    "font-family": fonts,
                    "font-size":"30px",
                    "text-align": mf["text-align"]
                }
                css = {...css,...options.css}

                symbol = rUD({
                    co,
                    bool: 'p',
                    val: key.split("_").reverse()[0] + ' a_p_p_SubHeading',
                    text: value,
                    css,
                    extras: {
                        deltaIndex: 1,
                        component,
                        multipleGroup,
                        type,
                        appNest: {
                            confirm:nestGroup === undefined ? "false": "true",
                            co,
                            nestGroup,
                            nestUnder,
							nest,
							zSymbolNeeded:"true"
                        }
                    }
                })
            }

            else if (type === "options") {
                if (this[co.valueOf()].metadata.toggleButton === undefined) {
                    this[co.valueOf()].metadata.toggleButton = {
                        options: {}
                    }
                }
                if (count !== undefined && this[co.valueOf()].metadata.toggleButton.options[group.valueOf()] === undefined) {
                    this[co.valueOf()].metadata.toggleButton.options[group.valueOf()] = {
                        selectedElement: [],
                        count,
                        stuff: []
                    }
                }


                let css = {
                    "z-index": 4,
                    display: "table",
                    "font-size": "21px",
                    // 'background-color':background,
					// color,

                    "font-weight": italics,
                    "font-family": fonts
                }
                css = {...css,...options.css}

                symbol = rUD({
                    co,
                    bool: 'a',
                    val: key.split("_").reverse()[0] + '  a_p_p_Selection',
                    text: value,
                    css,
                    extras: {
                        toggleButton: {
                            confirm: 'true',
                            onBackgroundColor: 'black',
                            onColor: 'white',
                            offBackgroundColor: 'transparent',
                            offColor: 'black',
                            selected: this[co.valueOf()].metadata.toggleButton.options[group.valueOf()] === undefined ? 'false' : () => { return this[co.valueOf()].metadata.toggleButton.options[group.valueOf()] },
                            mySelected: this[co.valueOf()].metadata.toggleButton.options[group.valueOf()] === undefined ? undefined : 'false'
                        },
                        appInputHandle: {
                            confirm: 'true',
                            zSymbol: "",// zChildSymbol goes here
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + group,
                            // if we get duplicated we need to do something abt it
                            value,
                            type: "options",
                            googleSheets,
                            required: form?.required !== undefined ? "options" : "false",
							link: form?.link,
							zSymbolNeeded:"true"
                        },
                        multipleGroup,
                        component,
                        deltaIndex: 1,
                        type,
                        group
                    }

                })
            }

            else if (type === "button") {

                let css = {
                    width: '325px',
                    "font-size": "48px",
                    top: "0px",
                    height: "75px",
                    left: '400px',
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
                    "font-weight": italics
                }
                css = {...css,...options.css}




                symbol = rUD({
                    co,
                    bool: 'b',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Button',
                    css,
                    extras: {
                        component,
                        deltaIndex: 1,
                        type,
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
                        },
                        appPrintFiles: {
                            printGroup,
                            type: 'signOut'
                        }
                    }
                })



            }

            else if (type === "add button") {

                let css = {
                    width: '325px',
                    "font-size": "48px",
                    top: "0px",
                    // height:"75px",
                    // left: '400px',
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
                    "font-weight": italics,
                }
                css = {...css,...options.css}

                symbol = rUD({
                    co,
                    bool: 'b',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Button',
                    css,
                    extras: {
                        component,
                        multipleAdd: multipleGroup,
                        type,
                        appNest: {
                            confirm:nestGroup === undefined ? "false": "true",
                            co,
                            nestGroup,
                            nestUnder,
							nest,
							zSymbolNeeded:"true"
                        }
                    }
                })

                if (this[co.valueOf()].metadata.multipleGroup === undefined && multipleGroup !== undefined) {
                    this[co.valueOf()].metadata.multipleGroup = {}
                }

                if (multipleGroup !== undefined) {
                    if (this[co.valueOf()].metadata.multipleGroup[multipleGroup.valueOf()] === undefined) {
                        this[co.valueOf()].metadata.multipleGroup[multipleGroup.valueOf()] = {}
                    }
                    this[co.valueOf()].metadata.multipleGroup[multipleGroup.valueOf()].add = symbol
                }

            }

            else if (type === "remove button") {

                let css = {
                    width: '325px',
                    "font-size": "48px",
                    top: "0px",
                    // height:"75px",
                    // left:'800px',
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
                    "font-weight": italics,
                }
                css = {...css,...options.css}

                // component.left = component?.left === undefined ? 900 : component.left

                symbol = rUD({
                    co,
                    bool: 'b',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Button',
                    css,
                    extras: {
                        component,
                        multipleRemove: multipleGroup,
                        type,
                        appNest: {
                            confirm:nestGroup === undefined ? "false": "true",
                            co,
                            nestGroup,
                            nestUnder,
							nest,
							zSymbolNeeded:"true"
                        }
                    }
                })

                if (this[co.valueOf()].metadata.multipleGroup === undefined && multipleGroup !== undefined) {
                    this[co.valueOf()].metadata.multipleGroup = {}
                }

                if (multipleGroup !== undefined) {
                    if (this[co.valueOf()].metadata.multipleGroup[multipleGroup.valueOf()] === undefined) {
                        this[co.valueOf()].metadata.multipleGroup[multipleGroup.valueOf()] = {}
                    }
                    this[co.valueOf()].metadata.multipleGroup[multipleGroup.valueOf()].remove = symbol
                }


            }

            else if (type === "submit button") {

                let css = {
                    width: '325px',
                    "font-size": "48px",
                    top: "0px",
                    // height:"75px",
                    // left:'400px',
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
                    "font-weight": italics
                }
				css = {...css,...options.css}

                symbol = rUD({
                    co,
                    bool: 'b',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Button',
                    css,
                    extras: {
                        appFormControl: {
                            confirm: 'true',
                            id: 'myForm',
                            co
                        },
                        component,
                        type
                    }
                })
            }

            // lab zChild additions
            else if (type === "googleMaps div") {

                let css = {
                    width: '325px',
                    "font-size": "48px",
                    top: "0px",
                    // height:"75px",
                    // left:'400px',
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
                    "font-weight": italics
                }
                css = {...css,...options.css}

                symbol = rUD({
                    co,
                    bool: 'div',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Maps',
                    css,
                    extras: {
                        appGoogleMaps: {
                            confirm: 'true',
                            co
                        },
                        component,
                        type
                    }
                })
            }

            //

            else if (type === "image") { // for now a better use of divs?


                let css = {
                }
				css = {...css,...options.css}

                let extend = {
                    src : "./assets/media/" + imageURL
                }


                symbol = rUD({
                    co,
                    bool: 'img',
                    val: key.split("_").reverse()[0]+ ' a_p_p_Image',
                    css,
                    extras: {
                        deltaIndex: 1,
                        component,
                        multipleGroup,
                        type,
                        extend,
                        appNest: {
                            confirm:nestGroup === undefined ? "false": "true",
                            co,
                            nestGroup,
                            nestUnder,
							nest,
							zSymbolNeeded:"true"
                        }
                    }
                })
            }

            else if (type === "video") { // for now a better use of divs?


                let css = {
                }
                css = {...css,...options.css}

                let extend = {
                    autoplay:"true",
					playsinline:"true",
					...options.extend
				}


                symbol = rUD({
                    co,
                    bool: 'video',
                    val: key.split("_").reverse()[0]+ ' a_p_p_Video',
                    css,
                    extras: {
                        extend,
                        deltaIndex: 1,
                        component,
                        multipleGroup,
                        type,
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
                        },
                        appNest: {
                            confirm:nestGroup === undefined ? "false": "true",
                            co,
                            nestGroup,
                            nestUnder,
							nest,
							zSymbolNeeded:"true"
                        }
                    }
                })
            }

            else if (type === "photo") { // for now a better use of divs?


                let css = {
                }
				css = {...css,...options.css}

                let extend = {
                    autoplay:"true",
                    playsinline:"true",
				}
				extend = {...options.extend}


                symbol = rUD({
                    co,
                    bool: 'c',
                    val: key.split("_").reverse()[0]+ ' a_p_p_Photo',
                    css,
                    extras: {
                        extend,
                        deltaIndex: 1,
                        component,
                        multipleGroup,
                        type,
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
                        },
                        appNest: {
                            confirm:nestGroup === undefined ? "false": "true",
                            co,
                            nestGroup,
                            nestUnder,
							nest,
							zSymbolNeeded:"true"
                        }
                    }
                })
            }

            else if (type === "file button") {


                let css = {
                    width: '325px',
                    "font-size": "48px",
                    top: "0px",
                    // height:"75px",
                    // left:'400px',
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
					"font-weight": italics,
					...options.css
				}

                let extend = {...options.extend}
                let name = this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value

                symbol = rUD({
                    co,
                    bool: 'b',
                    text: value,
                    val: key.split("_").reverse()[0] + " a_p_p_FileButton",
                    css,
                    extras: {
						extend,
                        appFileHandler: {
                            confirm: 'true',
                            name,
                        },
                        appInputHandle: {
                            confirm: 'true',
                            zSymbol: "",// zChildSymbol goes here
                            co,
                            name,
                            googleSheets,
                            required: form?.required !== undefined ? "file button" : "false",
							link: form?.link,
							zSymbolNeeded:"true",
                            type: "file button"
                        },
                        deltaIndex: 1,
                        component,
                        multipleGroup,
                        type
                    }
                })
            }

            else if (type === "signature") {


                let css = {
                    width: '1085px',
                    top: "0px",
                    height: "225px",
                    left: '90px',
                    border: "2px solid black",
					"background-color": "transparent",
					...options.css
				}
				let extend = {...options.extend}


                component.split = component.split === undefined ? this.appCO0.metadata.ryber.sectionDefault.split : component.split

                symbol = rUD({
                    co,
                    bool: 'c',
                    val: key.split("_").reverse()[0],
                    text: value,
                    css,
                    extras: {
                        deltaIndex: 1,
                        type,
                        appSignPad: {
                            confirm: 'true',
                            width: numberParse(css.width),
                            height: numberParse(css.height),
                        },
                        component,
                        multipleGroup,
                        refresh: {
                            group: refreshGroup
                        },
                        appInputHandle: {
							confirm: 'true',
							zSymbolNeeded:"true",
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value,
                            googleSheets,
                            link: form?.link
                        },

                    }
                })


            }

            else if (type === "display") {
				// strong argument to deprecate because if we start nesting do we want this

                let css = {
                    top: '0px',
                    left: '90px',
                    width: '1085px',
                    height: '1200px',
                    "background-color": background === undefined ? "rgb(211,211,211)" : background,
                    color,
					"border-radius": Modernizr.borderradius ? "20px 20px 20px 20px" : null,
					...options.css
                }


                component.height = component?.height === undefined ? 1200 : component.height

                symbol = rUD({
                    co,
                    bool: 'div',
                    val: key.split("_").reverse()[0],
                    css,
                    extras: {
                        deltaIndex: 1,
                        component,
                        multipleGroup,
                        type
                    }
                })
            }

            else if (type === "bullet point") {


                let css = {
                    "font-size": "24px",
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
					"font-weight": italics,
					...options.css
                }
				let extend = {...options.extend}

                symbol = rUD({
                    co,
                    bool: 'p',
                    val: key.split("_").reverse()[0] + ' a_p_p_BulletPoint',
                    css,
                    text: "• &nbsp;&nbsp;&nbsp;" + (value !== undefined ? value :
                        (
                            newline
                                .reduce((acc, x, i) => {
                                    acc += "<br><br>" + x
                                    return acc
                                })
                        )
                    ),
                    extras: {
                        deltaIndex: 1,
                        component,
                        multipleGroup,
                        type
                    }
                })
            }

            else if (type === "dropdown") {


                let extend= {...options.extend}
				form?.required === undefined ? null : ((a) => { a.required = form?.required })(extend)
				//  might have to deal with this logic on bootstrap end developer should feel free to make required as their own arg as well as form
                let css = {
                    "font-size": "24px",
                    "z-index": 5,
                    display: "table",
                    "text-align": "center",
                    'background-color': background,
                    color,
                    "font-family": fonts,
					"font-weight": italics,
					...options.css
                }

                symbol = rUD({
                    co,
                    bool: 'a',
                    val: key.split("_").reverse()[0] + ' a_p_p_DropDownMiddle',
                    css,
                    text: value,
                    extras: {
                        deltaIndex: 1,
                        extend,
                        appDropDown: {
                            confirm: 'true',
                            zSymbol: "",// zChildSymbol goes here
                            co,
                            values: newline,
                            truSelectVal: value
                        },
                        component,
                        multipleGroup,
                        type,
                        appInputHandle: {
                            googleSheets,
                            confirm: 'true',
                            type,
                            zSymbolNeeded:"true",
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value,
                            link: form?.link,
                            required: form?.required !== undefined ? "dropdown" : "false",
                        }
                    },

                })


            }

            else if (type === "count") {

                let css = {
                    "z-index": 4,
                    display: "table",
					"font-size": "54px",
					...options.css
				}
				let extend = {...options.extend}

                symbol = rUD({
                    co,
                    bool: 'p',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Text a_p_p_Count',
                    css,
                    extras: {
                        component,
                        multipleGroup,
                        deltaIndex: 1,
                        delta: { type: "increment" },
                        type,
                        appNest: {
                            confirm:nestGroup === undefined ? "false": "true",
                            co,
                            nestGroup,
                            nestUnder,
							nest,
							zSymbolNeeded:"true"
                        },
                    }
                })

            }

            else {

                let css = {
                    "font-size": "30px",
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-weight": italics,
                    "font-family": fonts,
					"text-align": devObj.mf["text-align"],
					...options.css
                }
				let extend = {...options.extend}

                symbol = rUD({
                    co,
                    bool: 'p',
                    val: key.split("_").reverse()[0] + '  a_p_p_Text',
                    text: value,
                    css,
                    extras: {
                        deltaIndex: 1,
                        component,
                        multipleGroup,
                        type: "text"
                    }
                })
            }

            return symbol
        }

        let zCT = ((a) => {
            return (zConsist) => {
                return zChildTemplate.call(a, zConsist)
            }
        })(this)

        // cms setup
        let regex = {
            phone: '[| +][(]?[0-9]{1}[0-9]{2}[)-. ]?[0-9]{1}[0-9]{2}[-. ]?[0-9]{4}[| +]',
            dl: ' +^[0-9]{7,8}$ +',
            ssn: '[0-9]{3}[-]?[0-9]{2}[-]?[0-9]{4}',
            zip: '^(\d\w){5}(?:[-\s](\d|\w){4})?$',
        }
        let cmsData
        let sucessCMS
        try {
            // cmsData = cms()
            // will be using cms later cosmicjs issues
            sucessCMS = cmsData.objects === undefined ? false : true // change if bad check
        }
        catch (e) {
            sucessCMS = false
        }

        let convertCMS: any = {}
        let myCMS: any = undefined
        if (sucessCMS) {

            // setup sheet metadata given form the cms
            cmsData.objects
            .forEach((x, i) => {
                if (x.type_slug === "google-sheets") {

                    x.metafields
                    .forEach((y, j) => {

                        y.children
                        .forEach((z: any, k) => {

                            if (z.title === "subsheet titles") {
                                this.appCO0.metadata["google-sheets"] = objectCopy(z.options)
                            }

                            else if (z.title === "office fields") {
                                z.children
                                .forEach((w: any, h) => {
                                    if (w.title === "applicant_id") {
                                        this.appCO0.metadata["applicant_id"] = objectCopy(w.options)

                                    }
                                })
                            }

                        })

                    })

                }

            })

            if (this.appCO0.metadata["google-sheets"] !== undefined) {
                this.appCO0.metadata["google-sheets-mapping"] =
                Object.fromEntries(
                this.appCO0.metadata["google-sheets"]
                .map((x: any, i) => {
                    return [x.key, x.value]
                })
                )
            }
            this.appCO0.metadata["applicant_id_mapping"] = this.appCO0.metadata["applicant_id"]
            ?.map((x: any, i) => {
                let conversionKey = this.appCO0.metadata["applicant_id"][i].key
                return {
                    key: this.appCO0.metadata["google-sheets-mapping"][conversionKey.valueOf()] === undefined ? x.key : this.appCO0.metadata["google-sheets-mapping"][conversionKey.valueOf()],
                    value: x.value
                }
            })
            //

            //frontend from the cms
            convertCMS = cmsData
            .objects
            .filter((x: any, i) => {
                return x.type_slug !== "google-sheets"
            })
            .map((x, i) => {
                let contentMetafields =
                    x.metafields
                    .map((x: any, i) => {
                        let myContent =
                        objectCopy(
                            x.children
                            .filter((y: any, j) => {
                                return y.title === "content"
                            })[0]
                        )
                        myContent.key = x.key
                        return myContent
                    })
                return {
                    title: x.title,
                    type_slug: x.type_slug,
                    metafields: contentMetafields
                    .map((y, j) => {

                        let newline = []
                        let googleSheets = {}

                        let options =
                        y.options
                        .map((z, k) => {


                            if (z.key === 'newline') {
                                newline.push(z.value)
                                return null
                            }

                            else {
                                return Object.values(y.options[k])
                            }

                        })
                        .filter((z, k) => {
                            return z !== null
                        })


                        x.metafields[j].children
                        .filter((z: any, k) => {
                            return z.title === "google subsheets"
                        })
                        .forEach((z: any, k) => {
                            z.children
                                .forEach((w: any, h) => {
                                    let googleSheetOptions = objectCopy(w.options)
                                    googleSheetOptions
                                        .forEach((xx: any, ii) => {
                                            delete xx?.selected
                                            googleSheetOptions[ii] = Object.values(xx)
                                        })
                                    // console.log(googleSheetOptions)
                                    googleSheets[this.appCO0.metadata["google-sheets-mapping"][w.key].valueOf()] = googleSheetOptions
                                })
                        })



                        options = Object.fromEntries(options)
                        options.googleSheets = objectCopy(googleSheets)
                        options["background"] !== undefined ? options["background"] = options["background"]?.split(" ").join("") : null
                        options["color"] !== undefined ? options["color"] = options["color"]?.split(" ").join("") : null
                        let result = {
                            key: y.key,
                            ...options,
                        }
                        newline.length !== 0 ? result.newline = newline : null
                        Object.keys(googleSheets).length !== 0 ? result.googleSheets = googleSheets : null
                        return result
                    })
                }

            })
            .filter((x, i) => {
                if (x.type_slug === "google-sheets") {
                    return false
                }
                return true
            })
            //

            // TODO when the app is online  and you change the cms data
            //


        }
        else {

            //use backup cache to setup the website
            convertCMS = objectCopy(website.convertCMS)
            delete website.convertCMS
            Object.assign(this.appCO0.metadata, website)
            //

        }

        // content setup
        let track = {}
        myCMS = Object
        .fromEntries(
            convertCMS
            .map((x, i) => {

                // tracking different components
                let mySlug = x.type_slug.split("s")[0]
                if (track[mySlug + 'CO'.valueOf()] === undefined) {
                    //co setup
                    track[mySlug + 'CO'.valueOf()] = 0
                    this[mySlug + 'CO'.valueOf()] = []
                    this[mySlug + 'CO$'.valueOf()] = new ReplaySubject<any>(1)
                    this.appCO0.metadata.CO.push(mySlug + 'CO$'.valueOf())
                    //

                    //es setup
                    this[mySlug + 'ES'.valueOf()] = objectCopy(this.appES)
                    this.appCO0.metadata.ES.push(mySlug + 'ES'.valueOf())
                    //

                }
                else {
                    track[mySlug + 'CO'.valueOf()] += 1
                }
                let co = mySlug + 'CO' + track[x.type_slug.split("s")[0] + 'CO'.valueOf()] // if a slug starts with s ????? FIXME
                this[mySlug + 'CO'.valueOf()].push(co)
                this[mySlug + 'CO$'.valueOf()].next(this[mySlug + 'CO'.valueOf()])
                //
                let x$ = of(x)


                let coOrderArray = []
                this.appCO0.metadata.ryber.CO$.push(

                    x$
                    .subscribe((item) => {
                        let coArray: any = this[mySlug + 'CO'.valueOf()]

                        x.metafields
                        .forEach((y, j) => {


                            // they forgot to create a new component fail gracefully and given them a board
                            if (j === 0) {
                                if (y.type !== "body") {
                                    coOrderArray.push(
                                        zCT({
                                            co: coArray[coArray.length - 1],
                                            mf: {
                                                key: "a_p_p_Board",
                                                type: "body",
                                                background: ["lightgrey", "white"][i % 2],
                                                title: x.title
                                            }

                                        })
                                    )
                                }
                                // debugger
                            }
                            //

                            coOrderArray.push(
                                zCT({
                                    co: coArray[coArray.length - 1],
                                    mf: j === 0 ? { ...y, title: x.title } : y
                                })
                            )
                        })
                        this[co.valueOf()].metadata.order = coOrderArray.splice(1)
                        coOrderArray = []
                    })
                )

                return [co, x]
            })
        )
        //

        // console.log(myCMS)
        // console.log(this.appCO0.metadata["google-sheets"].metafields[0].options )
        // console.log(myCMS['formCO0'].title)
        // console.log(JSON.stringify(convertCMS,null,4))
        // console.log(cmsData)
        // console.log(this)



    };

    ngOnDestroy() {
        this.appCO0.metadata.ryber.CO$
            .forEach((x, i) => {
                x.unsubscribe?.()
            })
    }

    a: BehaviorSubject<any> = new BehaviorSubject<any>({ boardTop: '52px', boardHeight: '56px' })

    /* app*/
    appCurrentNav: string = "/home"
    appReloaded: string = "true"
    appES = {
        router: {
        },
        resize: {
        },
        click: {
        },
        load: {
        },
        input: {
        },
        latchUpdate:{}
    }
    appSubscriptionArray: Subscription[] = []
    appViewComplete: Subject<any> = new Subject<any>()
    appViewCompleteArray: Array<any> = []
    appEventListener: Function = (a, event = null) => {
        if (typeof a === "function") {

            // check if were greater    than v9
            if (
                parseInt(VERSION.major) >= 9
            ) {
                a(event)
            }
            else {
                a()
            }
            //

        }
    }
    // so you dont get bogged by forced to fill out empty arrays
    appAvailble: Function = (item, prop) => {
        try {
            return item[prop.valueOf()]
        }
        catch (e) {
        }
    }
    //
    appEvents: Function = (devObj: {
        typesES: string,
        event: string, //property of ES
        of: Observable<any>
    }) => {
        let item = this[devObj.typesES.valueOf()][devObj.event.valueOf()].generator.next().value
        this[devObj.typesES.valueOf()]
        [devObj.event.valueOf()]
        [item] =
            devObj.of
        return item
    }
    appAddScripts:Function = (devObj) =>{
        let {scripts} = devObj
        return scripts
        .map((x, i) => {
            let s = this.renderer2.createElement('script') as HTMLScriptElement;
            this.renderer2.setAttribute(s,"type",x.type || 'text/javascript' )
            x.src ? this.renderer2.setAttribute(s,"src",x.src) : null
            x.innerText ? this.renderer2.setProperty(s,"innerText",x.innerText) : null
            x.innerText ? this.renderer2.setProperty(s,"innerHTML",x.innerText) : null
            x.async  ? this.renderer2.setAttribute(s,"async",x.async) : null
            if(x.placement){
                if(x.placement?.appendChild){
                    this.renderer2.appendChild(x.placement.appendChild, s)
                }
                else if(x.placement?.insertBefore){

                    this.renderer2.insertBefore(x.placement.insertBefore.parent, s,x.placement.insertBefore.sibling)
                }
            }
            else{
                this.renderer2.appendChild(window.document.head, s);
            }
            return {element:s,name:x.name}
        });
    }
    appTestKeyword = "root"
    appTV = ""
    // appCO  extra metadata object
    appCO0: Partial<componentObject> = {
        metadata: {
            component:{
                responsiveHeightExclude:["mat-spinner","ta","c","div","ag-grid","i","b","video"]
                // should be if the item is nested
            },
            ES: [], //eventSubscriptions
            CO: [],
            formCentral: {
                applicantInput: "",
            },
            ryber: {
                CO$: [],
                sectionDefault: {
                    gap: 90, // if the gap is wildily bigger it wont stack appropraitely, make sure we gap approaitely
                    left: 50,
                    width: 1175,
                    split: 9,
                    stack: 20
                }
            },
            webRTC:{
                init:["localVideo","dataChannelSend","camera","myVideo"]
            },
            inputHandle: {
                mappings: [
                    {
                        type: "dropdown",
                        cssClass: "a_p_p_DropDown",
                    },
                    {
                        type: "options",
                        cssClass: "a_p_p_Selection",
                    },
                    {
                        type: "file button",
                        cssClass: "a_p_p_FileButton",
                    }
                ]
            },
            clickDone: new ReplaySubject<Array<any>>(1),
            clickDoneArray: [],
            destroyComplete: new ReplaySubject<any>(1),
            updateSheet: new ReplaySubject<any>(1),
            scripts:[]
        },
        quantity: []
    }
    //

    //dev additions
    webRTCVideo = 'true'
    webRTCText = 'false'
    //

    /* */








}

