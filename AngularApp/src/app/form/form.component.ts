import { Component, OnInit, Input, ViewChildren, AfterViewInit, Inject, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Renderer2, ElementRef } from '@angular/core';
import { RyberService } from '../ryber.service';
import { fromEvent, interval, of, from, Observable, merge, Subject, BehaviorSubject, combineLatest, forkJoin,concat } from 'rxjs';
import { catchError, take, timeout, mapTo, debounceTime, distinctUntilChanged, debounce, first, ignoreElements, tap, delay,withLatestFrom, skipUntil, map } from 'rxjs/operators';
import {
    zChildren, getTextWidth, numberParse,
    xPosition, resize, componentBootstrap, deltaNode,
    eventDispatcher, dropdown, dragElement, stack, xContain, minMaxDelta,
    objectCopy, responsiveMeasure, flatDeep, zChildText,componentConsole,ryberPerfect
} from '../customExports'
import { environment as env } from '../../environments/environment'

@Component({
    selector: 'app-form',
    templateUrl: '../template.component.html',
    // styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit  , AfterViewInit, OnDestroy {


    @ViewChildren('myVal', {read:ElementRef}) templateMyElements: any;

    constructor(
        public ryber: RyberService,
        private ref: ChangeDetectorRef,
        private renderer: Renderer2,
    ) { }

    @Input() appTV:string | any;
    foo:any= {}
    typesES:string = 'formES'


    ngOnInit():void {
		if(env.lifecycleHooks) console.log(this.appTV+ 'ngOnInit fires on mount')

    }

    ngAfterViewInit(): void {
        // indicating where we are in the code
        if(env.inputHandle.options) console.groupEnd()
        if(env.lifecycleHooks) console.log( this.appTV+ 'ngAfterViewInit fires one remount')
        //

        // FPM for each component
        this.ryber['formCO']
        .forEach((xx,ii)=>{ // just becuase massive refactoring will take place so lets be gentle and use xx ii instead of x i


                if(xx !== this.appTV){
                    return
                }

                let zChild = this.zChildInit()
				let topLevelZChild = this._topLevelZChildInit()
				let formatZChild = this._formatZChildInit()
                let latchZChild
                let staticZKeys = this.staticZKeysGen(zChild)
                if(env.component.form.zChild.includes(ii)){
                    console.log("zChild for " +this.appTV , zChild);
				}
                if(env.component.form.topLevelZChild.includes(ii)){
                    console.log("topLevel zChild for " +this.appTV ,topLevelZChild);
				}



                // drags elements for you
                if(env.component.form?.drag?.includes( ii)){
                    this.toPlace(zChild)
                }
                //

				// highlights
                if(env.component.form?.highlights?.includes( ii)){
                    this.highlights(zChild,2)
                }

                //

                // giving directives data about the zChildren
                this.directivesSendData({
                    directivesZChild:zChild,
                    random:Math.random(),
                    templateMyElements:this.templateMyElements,
                    ref:this.ref
                })
                //


                /*  format factory
                so here are 3 options,
                    handle, the framework builds it out for use
                    flex, flex options 1-6 to divy how many elements  on one line
                        they will be fractions, 1/9 - 6/9 the size of our section
                    custom: not a general options to the line, its specific to an element
                        if the framework sees a  height and width, use those then the browser values

                for our section left, 90 , width 1085
                    for our section with its 1085 for a a total of 1175px document.dir = "ltr"

                    x- spacing is 90

                    if the section type is handle (this can go on body metafield cms), were going to be formatting ourselves
                    we add to the stack and once width + left is greater than 1175, the element goes to the next row
                        should we flush center, should  we keep left should we extend to fill the gap to justify
                            these can be options, but I think by default we should justify

                    split - the width can be bet determined by split/6
                    next - start zChild on the next stacking context
                */

                let section:any =  zChild["&#8353"]?.extras?.section

                if(section === undefined){
                    section = objectCopy(this.ryber.appCO0.metadata.sectionDefault)
                }

                else{
                    let sectionDefault :any = objectCopy(this.ryber.appCO0.metadata.ryber.sectionDefault)
                    section['gap'] !== undefined ?   section['gap'] :   sectionDefault.gap
                    section['left'] !== undefined ?  section['left'] :  sectionDefault.left
                    section['width'] !== undefined ? section['width'] : sectionDefault.width
                    section['split'] !== undefined ? section['split'] : sectionDefault.split
                    section['stack'] !== undefined ? section['stack'] : sectionDefault.stack
                }

                Object.keys(section)
                .forEach((x,i)=>{
                    section[x] = +section[x]
                })

                section.area =section.left + section.width
                // console.log(section)


				//grabbing the values how the browser renders them
                this.ryber[this.appTV.valueOf()].metadata.order = this.ryber[this.appTV.valueOf()].metadata.order
                .filter((x:any,i)=>{

					return !(zChild[x]?.extras?.judima?.formatIgnore === "true")
				})
                // console.log(this.ryber[this.appTV.valueOf()].metadata.order)
                this.ryber[this.appTV.valueOf()].metadata.order
                .forEach((x,i)=>{
                    let defaultClientRect = zChild[x].element.getBoundingClientRect()
                    zChild[x].cssDefault["height"]   = defaultClientRect.height.toString() + "px"
                    zChild[x].cssDefault["width"]   = defaultClientRect.width.toString() + "px"
                    zChild[x].cssDefault["left"]   = defaultClientRect.left.toString() + "px"
                    zChild[x].cssDefault["top"]   = defaultClientRect.top.toString() + "px"
                    this.ref.detectChanges()
                })
                //

                //applying end user values
                let keep = []
                let keepCurrent = []
				let keepLast = Object.keys(topLevelZChild).slice(1,2)[0]
                let align = []
                let alignCurrent = []
                let myTotal = 0
                this.ryber[this.appTV.valueOf()].metadata.order
                .forEach((x,i)=>{

					let {component} = zChild[x].extras
					Object.keys(component)
					.forEach((y,j)=>{ // if issues look here
						let a = component[y]
						if( !isNaN(a)){
							component[y] = +(component[y])
						}

					})


                    zChild[x].css["height"] = (component.height !== undefined) ?  (component.height).toString() + "px" : zChild[x].cssDefault["height"]
                    zChild[x].css["width"] = (component.width !== undefined) ?  (component.width).toString() + "px" : zChild[x].cssDefault["width"]
                    zChild[x].css["left"] = (component.left !== undefined) ?  (component.left).toString() + "px" : zChild[x].cssDefault["left"]
                    zChild[x].css["top"] = (component.top !== undefined) ?  (component.top).toString() + "px" : zChild[x].cssDefault["top"]
                    if(zChild[x]?.css?.["width"] !== undefined){
                        if(numberParse(zChild[x].css["width"]) > section.width){
                            zChild[x].css["width"] = section.width.toString() +"px"
                        }
                    }

                    //determine width
					myTotal +=  component.split === undefined ? numberParse(zChild[x].css["width"]) : ((component.split/section.split) *  section.width)

					if(component.split === section.split){
						zChild[x].css["width"] = component.split === undefined ? zChild[x].css["width"] : (((component.split/section.split) * section.width)).toString() + "px"
					}
					else{
						zChild[x].css["width"] = component.split === undefined ? zChild[x].css["width"] : (((component.split/section.split) * section.width)-section.gap).toString() + "px"
					}

					keepCurrent.push([x,keepLast])
					alignCurrent.push(x)
                    //



                    if((!["date","ta","i"].includes(zChild[x].bool) ) && component.height === undefined ){
                        zChild[x].css["height"] = null
                        this.ref.detectChanges()
                        zChild[x].css["height"] = zChild[x].element.getBoundingClientRect().height.toString() + "px"
                        this.ref.detectChanges()
                    }




                    //stacking context
                    if((myTotal  > section.width && i !== Object.keys(topLevelZChild).slice(2).length -1) || (component.next === "true" && i !== Object.keys(topLevelZChild).slice(2).length -1 )){
                        // console.log('a')
                        // mySplit = 0
                        myTotal =  numberParse(topLevelZChild[x].css["width"])
                        let a = keepCurrent.pop()
                        keep.push(...keepCurrent)
                        keepLast = keepCurrent
                        .reduce((acc,y,j)=>{
                            // console.log(y[0],topLevelZChild[y[0]].css["height"],acc)
                            if(numberParse(topLevelZChild[y[0]].css["height"])   > acc[1]){
                                acc = [y[0],numberParse(topLevelZChild[y[0]].css["height"])]
                            }
                            return acc
                        },["",0])[0]
                        // console.log(keepCurrent)
                        // console.log(keepLast)
                        keepCurrent = [[a[0],keepLast]]
                        let b = alignCurrent.pop()
                        align.push(alignCurrent)
                        alignCurrent = [b]
                    }

                    else if( (myTotal  < section.width  && i === Object.keys(topLevelZChild).slice(2).length -1) && ( component.next !== "true"  )  ){
                        // mySplit = 0
                        // console.log('b')
                        myTotal =   numberParse(topLevelZChild[x].css["width"])
                        keep.push(...keepCurrent)
                        keepLast = keepCurrent
                        .reduce((acc,y,j)=>{
                            return numberParse(topLevelZChild[y[0]].css["height"]) > acc[1] ?
                            [y[0],numberParse(topLevelZChild[y[0]].css["height"])] :
                            acc
                        },["",0])[0]
                        keepCurrent = []
                        align.push(alignCurrent)
                        alignCurrent = []
                    }

                    else if( (i === Object.keys(topLevelZChild).slice(2).length -1) || (component.next === "true" )){
                        // console.log('c')
                        myTotal  =  numberParse(topLevelZChild[x].css["width"])
                        let a = keepCurrent.pop()
                        keep.push(...keepCurrent)
                        keepLast = keepCurrent
                        .reduce((acc,y,j)=>{
                            return numberParse(topLevelZChild[y[0]].css["height"]) > acc[1] ?
                            [y[0],numberParse(topLevelZChild[y[0]].css["height"])] :
                            acc
                        },["",0])[0]
                        // console.log(keepLast)
                        keepCurrent = [[a[0],keepLast]]
                        keep.push(...keepCurrent)
                        let b = alignCurrent.pop()
                        align.push(alignCurrent)
                        alignCurrent = [b]
                        align.push(alignCurrent)
                    }
                    //


                })

                align
                .forEach((x,i)=>{
                    let gaps =
                        ((section.width) -
                        x.reduce((acc,y,j)=>{
                            acc += numberParse(zChild[y].css["width"])
                            return acc
                        },0) ) /  ( x.length-1 )
                    let gapType = x.reduce((acc,y,j)=>{
                            acc += numberParse(zChild[y].css["width"]) + (
                                zChild[y].extras?.component?.split === undefined || zChild[y].extras?.component?.split === 6 ? 0: section.gap
                            )
                            return acc
                        },0)
                    x
                    .forEach((y,j)=>{
                        //determine left
                        if(zChild[y].extras?.component?.left !== undefined){
                            return
                        }
                        if(j === 0){
                            zChild[y].css["left"] = section.left + "px"
                            // console.log(zChild[y].css["left"])
                        }
                        else{

                            zChild[y].css["left"] = (
                                numberParse(   zChild[x[j-1]].css["left"]  ) +
                                numberParse(   zChild[x[j-1]].css["width"]  ) +
                                // section.gap
                                (gapType >= section.width -300 ?gaps : section.gap)
                            ).toString() + "px"
                        }
                        //
                    })

                })
                this.ref.detectChanges()

                //making sure values are true to the DOM
                staticZKeys
                .forEach((x,i)=>{
                    zChild[x].css["height"] = (zChild[x].element.getBoundingClientRect().height).toString() + "px"
                    zChild[x].css["width"] = (zChild[x].element.getBoundingClientRect().width).toString() + "px"
                    zChild[x].cssDefault["height"] = zChild[x].css["height"]
                    zChild[x].cssDefault["width"] = zChild[x].css["width"]
                    zChild[x].cssDefault["left"] = zChild[x].css["left"]
                    zChild[x].cssDefault["top"] = zChild[x].css["top"]
                })
                this.ref.detectChanges()

                //

                //init   buttons
                let group = this.ryber[this.appTV.valueOf()].metadata.deltaGroup
                // console.log(group)

                //more init
                let cmsZKeys = this.ryber[this.appTV.valueOf()].metadata.order
                let {refresh} = this.ryber[this.appTV.valueOf()].metadata
                //

                // refresh (sigs and more in the fture) setup
				//  try to use a directive and how we deal with a directive group to deal with the problem
                //


                //stack spacing setup
                // console.log(align)
                let spacing =  [null,
                    ...Array.from(align[0],(x,i)=> {return 50}),
					...Array.from(align[1] !== undefined && align[0].length <= 1 ? align[1] : Array(0) ,(x,i)=> {return 50}),
					section.stack
                ]
                cmsZKeys
                .forEach((x:any,i)=>{
                    if(zChild[x].extras.component.top !== undefined){
                        spacing[i+1] = zChild[x].extras.component.top
                    }
                    if(spacing[i+1] === undefined){
                        spacing[i+1]= section.stack
                    }
                })
                //

                //latch setup
                this.ryber.appEvents({
                    typesES:this.typesES,
                    event:'zChildUpdate',
                    of:combineLatest([
                        this.ryber[this.appTV].metadata.latch.updateZChild,
                        this.templateMyElements.changes
                    ])
                    .pipe(
                        delay(2)
                    )
                    .subscribe((a)=>{

                        //fix the component object before continuing
                        let co = this.ryber[this.appTV]
						ryberPerfect({co});

                        zChild = this.zChildInit()
                        topLevelZChild = this._topLevelZChildInit()
                        latchZChild = this.ryber[this.appTV].metadata.latch.zChild = this._latchZChildInit()


                        this.directivesSendData({
                            directivesZChild:zChild,
                            random:Math.random()
                        })
                        eventDispatcher({
                            event:'resize',
                            element:window
                        })
                    })
                })
				//

				//deltaNode setup
					// FIX ME, flicker on the screen because templateMyElements.changes, fires several times
					// if you put a delay on updateZChild it will not work out well

				this.ryber.appEvents({
                    typesES:this.typesES,
                    event:'zChildUpdate',
                    of:combineLatest([

						// this.templateMyElements.changes,
						this.ryber[this.appTV].metadata.deltaNode.updateZChild
					])
                    .subscribe((result)=>{
                        //fix the component object before continuing
                        let co = this.ryber[this.appTV]
						ryberPerfect({co,exclude:["cssDefault"]});
						this.ref.detectChanges()
                        zChild = this.zChildInit()
                        topLevelZChild = this._topLevelZChildInit()
                        latchZChild = this.ryber[this.appTV].metadata.latch.zChild = this._latchZChildInit()



                        this.directivesSendData({
                            directivesZChild:zChild,
                            random:Math.random()
                        })
                        eventDispatcher({
                            event:'resize',
                            element:window
                        })
                    })
                })
				//
				let finalZChildKeys =[
					"&#8353",
					...cmsZKeys
				]

                this.ryber.appEvents({
                    typesES:this.typesES,
                    event:'resize',
                    of:(
                        this.ryber[this.ryber['formCO'][ii-1]]?.metadata[this.appTV] !== undefined ?
                        this.ryber[this.ryber['formCO'][ii-1]]?.metadata[this.appTV] :
                        fromEvent(window,'resize')
                    )
                    .subscribe((moving)=>{


                        if(moving instanceof Event){
                            moving = {
                                boardHeight : "0px",
                                boardTop : "0px"
                            }
                        }


                        // dynnamic element management bootstrap
                        let  {deltaNodeSite} = this.ryber[this.appTV.valueOf()].metadata
                        let  {current} = deltaNodeSite === undefined ? this.foo :deltaNodeSite

                        //

                        // console.log(numberParse(getComputedStyle(zChild["&#8353"].element).width))
                        // console.log(section.area)

                        if(   numberParse(getComputedStyle(zChild["&#8353"].element).width) > section.area   ){

                            // element management
                            {

                                // functionality
                                {

                                    //clean up
                                    Object
                                    .keys(zChild)
                                    .slice(2)
                                    .forEach((x,i)=>{

                                        zChild[x].css["height"] = zChild[x].cssDefault["height"]
                                        zChild[x].css["width"] = zChild[x].cssDefault["width"]
                                        zChild[x].css["font-size"] = zChild[x].cssDefault["font-size"]

                                    })
                                    this.ref.detectChanges()
                                    //



                                    //responsive height
                                    staticZKeys
                                    .forEach((x,i)=> {
                                        if(!this.ryber.appCO0.metadata.component.responsiveHeightExclude.includes(zChild[x].bool )){
                                            zChild[x].css["height"] = null
                                            zChild[x].css["display"] = "table"
                                            this.ref.detectChanges()
                                            zChild[x].css["height"] =  (zChild[x].element.getBoundingClientRect().height).toString() + "px"
                                        }
                                    })
									//

									let {finalKeep,finalSpacing,finalAlign} =((devObj)=>{
										let {current,groups}  =this.ryber[this.appTV].metadata.deltaNode
										let currentGroup = groups[current?.group]
										let judimaDeltas = []

										let {finalKeep,finalSpacing,finalAlign} =devObj
										if(current !== null && !currentGroup.hooks.directive.includes("done")){
											console.log(current,currentGroup)
											currentGroup.hooks.component =currentGroup.hooks.directive
											current?.deltas
											.forEach((x:any,i)=>{
												// format in the context of the component
												if(zChild[x]?.extras?.judima?.formatIgnore === "false"){

													judimaDeltas.push(x)

												}
												//
											})
											//figure out the attach
											let box:any ={
												targets:(currentGroup.deltas.length > 1  ?
												currentGroup.deltas[currentGroup.deltas.length-2] .map((x:any,i)=>{
													return [x,zChild[x]]
												}) : currentGroup.targets)
												.filter((x:any,i)=>{

													return x[1]?.extras?.judima?.formatIgnore !== "true"
												}),
												delta:null
											}

											if(box.targets.length !==0){
												box.delta =minMaxDelta({
													items: box.targets,
													min:(item)=>{
														return {
															key:item[0],
															value:numberParse(item[1].css["top"])
														}
													},
													max:(item)=>{
														return {
															key:item[0],
															value:numberParse(item[1].css["top"]) +
															numberParse(item[1].css["height"])
														}
													},
													type:"identify"
												})
												let movingAttach = current.deltas[current.deltas.length-1]
												//

												// try to rewrite items for stack
												finalKeep
												.forEach((x:any,i)=>{
													if(x[1]=== box.delta.max.key){
														x[1] = movingAttach
													}
												})

												let insertIndex = {
													keep:(finalKeep .map((x:any,i)=>{
														return x[0]
													}).indexOf(box.delta.max.key)),
													zChildKeys:finalZChildKeys.indexOf(box.delta.max.key)
												}
												let keepAdditions = current.deltas .map((x:any,i)=>{
													return [x,box.delta.max.key]
												})
												finalKeep.splice(      insertIndex.keep+1,0,...keepAdditions)
												finalZChildKeys.splice(insertIndex.zChildKeys+1,0,...current.deltas)
												// finalSpacing.splice(   insertIndex.keep+2,0,...Array(current.deltas.length).fill(60))
												// console.log(finalKeep)
												//

												//align setup
												let targets ={
													zChildren :currentGroup.targets .map((x:any,i)=>{
														return x[0]
													})
													.filter((x:any,i)=>{
														return  x[1]?.extras?.judima?.formatIgnore !== "true"
													}),
													deltas:current.deltas.filter((x:any,i)=>{
														return  zChild[x]?.extras?.judima?.formatIgnore !== "true"
													}),
													currentCounter:0
												}

												let addedAlign = finalAlign .map((x:any,i)=>{
													return x .filter((y:any,j)=>{
														return targets.zChildren.includes(y)
													})
													.map((y:any,j)=>{
														return targets.deltas[targets.currentCounter++]
													})
												})
												.filter((x:any,i)=>{
													return x.length !== 0
												})
												finalAlign.push(...addedAlign)

												console.log(finalAlign)
												//

												// console.log(currentGroup.hooks)
											}
											//
											currentGroup.hooks.directive = currentGroup.hooks.component =currentGroup.hooks.component.split(" ")[0] +" done"
											//
										}


										return{
											finalKeep,
											finalSpacing,
											finalAlign
										}



									})({
										finalKeep:keep,
										finalSpacing:spacing,
										finalAlign:align
									})

									let stackObj = {
                                        zChildKeys:finalZChildKeys,
                                        ref: this.ref,
                                        zChild,
                                        spacing:finalSpacing,
                                        keep:finalKeep,
                                        type:'keepSomeAligned',
                                        heightInclude:[null,...Array.from(align[0],(x,i)=> {return 'f'}),...Array.from(align.slice(1).flat(),(x,i)=> {return 't'})]
                                    }
									stack(stackObj)
									// console.log(stackObj)
                                    this.ref.detectChanges()



									// align options
									let xContainObj = {
                                        preserve:{
                                            align,
                                            // zChild,
                                            zChild:latchZChild === undefined ? zChild:latchZChild,
                                            ref:this.ref,
                                            width:section.width,
                                            left:section.left
                                        },
                                        type:'preserve',
                                    }
									xContain(xContainObj);
									// console.log(xContainObj)
									//








                                }
								//
								return

                                //position
                                {



                                    // console.log(topLevelZChild)
                                    stack({
                                        type:"yPosition",
                                        yPosition:{
                                            zChild:topLevelZChild,
                                            moving:{
                                                top:moving.boardTop,
                                                height:moving.boardHeight
                                            },
                                            ref:this.ref
                                        }
									})



                                    // making sure we setup moving properly
                                    // let movingZAttachVal= cmsZKeys
                                    // .reduce((acc,x,i)=>{
                                    //     if(zChild[x]?.extras?.deltaGroup !== undefined){
                                    //         return x
                                    //     }
                                    //     return acc
									// })


                                    // let movingZKeys = cmsZKeys.slice(cmsZKeys.indexOf(movingZAttachVal)+1)
                                    // let movingFlag = "false"
                                    // let movingAttachVal =""
                                    // let movingKeep = keep
                                    // .reduce((acc,x,i)=>{

                                    //     if(movingZKeys[0] === x[0] ){
                                    //         movingFlag = "true"
                                    //         movingAttachVal = x[1]
									// 	}
                                    //     if(movingFlag === "true"){
                                    //         if(movingAttachVal === x[1]){
                                    //            acc.push([x[0],"replace me"])
                                    //         }
                                    //         else {
                                    //             acc.push(x)
                                    //         }
                                    //     }
                                    //     return acc
									// },[])
									// console.log(keep)

                                    //


                                    // let attach = this.dynamicPosition({
                                    //     deltaDiff:50,
                                    //     group,
                                    //     deltaNodeSite,
                                    //     zChild,
                                    //     current,
                                    //     attachVal:movingZAttachVal,
                                    //     zChildKeys:movingZKeys,
                                    //     section,
									// 	keep:movingKeep,
									// 	cmsZKeys,
                                    // })

                                    // position board
                                    this.ryber[this.appTV].metadata.ngAfterViewInitFinished.next("")
                                    // this.positionBoard({zChild:topLevelZChild,current,deltaNodeSite});
                                    //


                                }
                                //

                                //moving
                                {

                                }
                                //
                            }
                            //

                        }


                        else if(    numberParse(getComputedStyle(zChild["&#8353"].element).width) > 0  ){


                            //element management
                            {
                                // functionality
                                {


                                    //clean up

                                    //


                                    // same start
                                    // staticZKeys
                                    cmsZKeys
                                    .forEach((x,i)=>{
                                        zChild[x].css["width"] = (
                                            .9 * numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                        ).toString() + "px"
                                        this.ref.detectChanges()
                                        zChild[x].css["left"] = xPosition({
                                            target:numberParse(zChild[x].css["width"]),
                                            contain: numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                        }).toString() + "px"
                                    })
                                    this.ref.detectChanges()
                                    //


                                    //serveral targets


                                    let mobileShrinkFonts =   cmsZKeys
                                        .reduce((acc,x,i)=>{
                                            if(zChild[x]?.extras?.appFocusFont?.mobileShrink  ==="true"){
                                                acc.push(x)
                                            }
                                            return acc
                                        },[])


                                    mobileShrinkFonts
                                    .forEach((x,i)=>{
                                        zChild[x].css["font-size"]  =(
                                            resize({
                                                default:numberParse(   zChild[x].cssDefault["font-size"]   ),
                                                containActual:numberParse(   getComputedStyle(   zChild["&#8353"].element   ).width   ),
                                                containDefault:540,
                                                type:'nonUniform',
                                                misc:[.052,.06],
                                                mediaQuery:[379,286,0]
                                            })
                                        ).toString() + "px"
                                    })
                                    this.ref.detectChanges()
                                    //

                                    //responsive height
                                    staticZKeys
                                    .forEach((x,i)=> {
                                        if(!this.ryber.appCO0.metadata.component.responsiveHeightExclude.includes(zChild[x].bool )){
                                            zChild[x].css["height"] = null
                                            zChild[x].css["display"] = "table"
                                            this.ref.detectChanges()
                                            zChild[x].css["height"] =  (zChild[x].element.getBoundingClientRect().height).toString() + "px"
                                        }
                                    })
                                    //

                                    let responsiveMeasureTargets =cmsZKeys
                                    .reduce((acc,x,i)=>{

                                        if(zChild[x].bool === "ta" || zChild[x].bool === "c"){
                                            acc.push(zChild[x])
                                        }
                                        return acc
                                    },[])
                                    responsiveMeasure({
                                        item:{
                                            target:responsiveMeasureTargets,
                                            prop:[...Array.from(Array(responsiveMeasureTargets.length),()=> { return  "height"})]
                                        },
                                        values:[
                                            ...Array.from(Array(responsiveMeasureTargets.length),()=> { return  [[1190,163],[770,303],[495,343],[391,385],[305,426],[216,487],[175,650]]})

                                        ],
                                        measure:{
                                            target:zChild["&#8353"].element,
                                            prop:"width"
                                        }
                                    })
                                    this.ref.detectChanges()

                                    stack({
                                        zChildKeys:[
                                            "&#8353",
                                            ...cmsZKeys
                                        ],
                                        ref: this.ref,
                                        zChild,
                                        spacing:[null,100,section.stack],
                                        type:'simpleStack',
                                        heightInclude:[null,'f','t']
                                    })
                                    this.ref.detectChanges()


                                    if(group !== undefined && deltaNodeSite !== undefined){

                                        Object.keys(group)
                                        .forEach((x,i)=>{


                                            let myGroup = deltaNodeSite[x.valueOf()]
                                            if(     myGroup !== undefined){

                                                myGroup
                                                .symbols
                                                .forEach((y,j) => {


                                                    // modifying according to increment
                                                    if(zChild[y[0]]?.extras?.delta?.type === "increment" && j === deltaNodeSite[x.valueOf()].symbols.length -1){
                                                        try{
                                                            let counterString = zChild[y[0]].innerText.item.split("")
                                                            zChild[y[0]].innerText.item.split("")
                                                            .forEach((z,k)=>{
                                                                if(+z !== NaN){
                                                                    counterString.splice(k,1,+z +j+1)
                                                                    zChild[y[0]].innerText.item = counterString.join("")
                                                                    throw('e')
                                                                }
                                                            })
                                                        }
                                                        catch(e){
                                                            this.ref.detectChanges()
                                                            zChild[y[0]].extras.delta.type = "incrementDone"
                                                        }
                                                    }
                                                    //

                                                    // nested zChild have their own formatting scheme
                                                    if(zChild[y[0]].extras?.judima?.formatIgnore ==="true"){
                                                        return
                                                    }
                                                    //


                                                    // same start
                                                    y
                                                    .forEach((z,k)=>{
                                                        zChild[z].css["width"] = (
                                                            .9 * numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                                        ).toString() + "px"
                                                        this.ref.detectChanges()
                                                        zChild[z].css["left"] = xPosition({
                                                            target:numberParse(zChild[z].css["width"]),
                                                            contain: numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                                        }).toString() + "px"
                                                    })
                                                    this.ref.detectChanges()
                                                    //

                                                    //serveral font shrink targets
                                                    let dynamicMobileShrinkFonts =   y
                                                    .reduce((acc,z,k)=>{
                                                        if(zChild[z]?.extras?.appFocusFont?.mobileShrink  ==="true"){
                                                            acc.push(z)
                                                        }
                                                        return acc
                                                    },[])
                                                    dynamicMobileShrinkFonts
                                                    .forEach((z,k)=>{
                                                        zChild[z].css["font-size"]  =(
                                                            resize({
                                                                default:numberParse(   zChild[z].cssDefault["font-size"]   ),
                                                                containActual:numberParse(   getComputedStyle(   zChild["&#8353"].element   ).width   ),
                                                                containDefault:540,
                                                                type:'nonUniform',
                                                                misc:[.052,.06],
                                                                mediaQuery:[379,286,0]
                                                            })
                                                        ).toString() + "px"
                                                    })
                                                    this.ref.detectChanges()
                                                    //

                                                    //responsive height
                                                    y
                                                    .forEach((z,k)=> {
                                                        if(!this.ryber.appCO0.metadata.component.responsiveHeightExclude.includes(zChild[z].bool )){
                                                            zChild[z].css["height"] = null
                                                            zChild[z].css["display"] = "table"
                                                            this.ref.detectChanges()
                                                            zChild[z].css["height"] =  (zChild[z].element.getBoundingClientRect().height).toString() + "px"
                                                        }
                                                    })
                                                    //

                                                stack({
                                                    zChildKeys:y,
                                                    ref: this.ref,
                                                    zChild,
                                                    spacing:section.stack,
                                                    type:'simpleStack',
                                                    heightInclude:[null,'t']
                                                })
                                                this.ref.detectChanges()

                                                })

                                            }

                                        })
                                    }


                                }
                                //

                                //position
                                {

                                    stack({
                                        type:"yPosition",
                                        yPosition:{
                                            zChild:topLevelZChild,
                                            moving:{
                                                top:moving.boardTop,
                                                height:moving.boardHeight
                                            },
                                            ref:this.ref
                                        }
                                    })


                                    // making sure we setup moving properly
                                    let movingZAttachVal= cmsZKeys
                                        .reduce((acc,x,i)=>{
                                            if(zChild[x]?.extras?.deltaGroup !== undefined){
                                                return x
                                            }
                                            return acc
                                        })
                                    let movingZKeys = cmsZKeys.slice(cmsZKeys.indexOf(movingZAttachVal)+1)
                                    if(ii == 3){
                                        // console.log(zChild)
                                        // console.log(movingZAttachVal,movingZKeys)
                                    }
                                    //



                                    let attach = this.dynamicPosition({
                                        deltaDiff:50,
                                        group,
                                        zChild,
                                        current,
                                        deltaNodeSite,
                                        attachVal:movingZAttachVal,
                                        section,
                                        keep:[],
                                        zChildKeys:movingZKeys,
                                        type:'custom',
                                        customFn:((devObj)=>{
                                            let zChildKeys =[
                                                // devObj.attach, //mabye a good fix idek man
                                                ...movingZKeys,
                                            ]
                                            .filter((z:any,k)=>{
                                                // all nested not top level
                                                return !(
                                                    zChild[z]?.extras?.appNest?.confirm === "true" && zChild[z].extras?.appNest?.nestUnder !== undefined
                                                )
                                            })
                                            stack({
                                                zChildKeys,
                                                ref: this.ref,
                                                zChild,
                                                spacing:[null,section.stack],
                                                keep: [],
                                                type:'simpleStack',
                                                heightInclude:[null,'t','t']
                                            })
                                            this.ref.detectChanges()
										}),
										cmsZKeys
                                    })



                                    // position board
                                    this.ryber[this.appTV].metadata.ngAfterViewInitFinished.next("")
                                    this.positionBoard({zChild:topLevelZChild,current,deltaNodeSite});
                                    //


                                }
                                //

                                //moving
                                {

                                }
                                //
                            }
                            //


                        }


                        // so you wont have to find the panel
                        if(ii === env.component?.[this.appTV.split("C")[0].valueOf()]?.panelView){
                            this.currentScroll(zChild)
                        }
                        //


                        //send moving data to the next CO
                        this.ryber[this.appTV].metadata?.[this.ryber['formCO'][ii+1]]?.next?.({
                            boardTop:zChild["&#8353"].css["top"],
                            boardHeight:zChild["&#8353"].css["height"]
                        })
                        //


                    })
                })




        })
        //

		// help app.component.ts trigger and make the website using the FPM for each component
			// used for navigation
        this.ryber.appViewComplete.next(
            (function(qq){
                qq.ryber.appViewCompleteArray.push(   qq.appTV   )
            })(this)
		)
		//


    }

    ngOnDestroy(): void {
        if(env.lifecycleHooks) console.log(this.appTV+ '  ngOnDestroy fires on dismount')
        Object
        .values(this.ryber[this.typesES])
        .forEach((x:any,i)=>{
            Object
            .values(x)
            .forEach((y:any,j)=>{
                if(y.unsubscribe !== undefined ){
                    y.unsubscribe()
                }
            })
        })
    }

    private positionBoard(devObj?:any) {
        let {zChild,current,deltaNodeSite}= devObj
        let max:any = Object.keys(zChild)
            .slice(2)

            if(current?.intent === "minus" && current.hook === "prepare"){
                let leftJoin = deltaNodeSite?.[current.group].symbols[current.count]
                let mySet = new Set([...leftJoin,...max])
                const toRemoveMap = leftJoin.reduce((memo, item) => ({
                    ...memo,
                    [item]: true
                  }), {});

                max = max.filter(x => !toRemoveMap[x]);

            }

            max = max
            .reduce((acc: any, x, i) => {

                if(zChild[x]?.extras?.appDropDown?.change === "dropdowns"){
                    return acc
                }

                let sum = numberParse(zChild[x].css["top"]) +
                    numberParse(zChild[x].css["height"]);

                if (sum > acc[1]) {
                    acc = [x, sum];
                }
                return acc;
            }, ["", 0])[0];

        if(zChild["&#8353"].extras.component.height !== undefined){
            zChild["&#8353"].css["height"] = zChild["&#8353"].extras.component.height.toString() + "px"
        }

        else{
            zChild["&#8353"].css["height"] = (
                numberParse(zChild[max].css["top"]) +
                numberParse(zChild[max].css["height"]) +
                50 -
                numberParse(zChild["&#8353"].css["top"])
            ).toString() + "px";
        }
        this.ref.detectChanges();
    }

    private _topLevelZChildInit (){
        let topLevelZChild = this.zChildInit()
        Object.keys(topLevelZChild)
        .forEach((x:any,i)=>{



			if(topLevelZChild[x]?.extras?.judima?.topLevelZChild === "false"){
				// console.log("true")
				delete topLevelZChild[x]
			}

        })
        return topLevelZChild
	}

    private _formatZChildInit (){
        let zChild = this.zChildInit()
        Object.keys(zChild)
        .forEach((x:any,i)=>{



			if (!(zChild[x]?.extras?.judima?.formatIgnore === "true")){
				// console.log("true")
				delete zChild[x]
			}

        })
        return zChild
    }

    private _latchZChildInit(){
        let latchZChild = this.zChildInit()
        Object.keys(latchZChild)
        .filter((x:any,i)=>{
            if(latchZChild[x]?.extras?.judima?.format === "false"){
				// if(latchZChild[x]?.extras?.judima?.latchZChild === "true"){
                delete latchZChild[x]
            }
        })
        return latchZChild
    }

    private dropDownInit(devObj) {


        let {deltaNodeSite,dropDownGroup,zChild} = devObj
        Object
		.keys(deltaNodeSite)
		.forEach((x, i) => {
			if (x.includes("dropDownGroup")) {
				dropDownGroup[x] = deltaNodeSite[x];
			}
		});
        // debugger
        // console.log(Object.keys(zChild).slice(2))
        // making sure we reinit zChild once
        if (this.ryber[this.appTV.valueOf()].metadata.coDropDown?.init === "false") {

            Object
                .keys(zChild)
                .slice(2)
                .forEach((x, i) => {
                    // console.log(zChild[x].extras.appDropDown)
                    // console.log(x)
                    if (zChild[x].extras?.appDropDown !== undefined) {
                        // this memans there are new elements on the DOM , update the zChild
                        if (zChild[x].extras.appDropDown.change === 'modified'){
                            this.ref.detectChanges();
                            zChild = this.zChildInit();
                            // debugger
                            zChild[x].extras.appDropDown.change = 'ontheDOM';
                            zChild[x].extras.appDropDown.options = {
                                symbols: deltaNodeSite[zChild[x].extras.appDropDown.group.valueOf()].symbols[0]
                            };

                            // modifiying the options as appropriate
                            zChild[x].extras.appDropDown.options.symbols
                            .forEach((y,j)=>{

                                zChild[y].innerText.item =  zChild[x].extras.appDropDown.values[j]
                                zChild[y].css["height"] = "0px"
                                zChild[y].css["width"] = "0px"
                                zChild[y].css["z-index"] =   -1
                                zChild[y].css["opacity"] =   0
                                zChild[y].css["top"] =  "0px"
                                // if issues look at top
                                zChild[y].css["left"] =  "0px"
                                zChild[y].extras.appDropDown.mySymbol = y
                                if(j === zChild[x].extras.appDropDown.options.symbols.length - 1){
                                    this.renderer
                                    .removeClass(
                                        zChild[y].element,
                                        "a_p_p_DropDownMiddle"
                                    )
                                    this.renderer
                                    .addClass(
                                        zChild[y].element,
                                        "a_p_p_DropDownLast"
                                    )
                                    return
                                }
                            })
                            this.ref.detectChanges()
                            //

                            zChild[x].extras.appDropDown.confirm = "true";
                        }
                    }
                });
            this.ryber[this.appTV.valueOf()].metadata.coDropDown.init = "true";
            this.ryber[this.appTV.valueOf()].metadata.zChildren = zChild;
            this.ref.detectChanges();

        }
        // making sure we do reinit the zChild too many
        // console.log(zChild);
        return zChild;
    }

    private directivesSendData(devObj?:{
        directivesZChild:zChildren,
        random?:any,
        templateMyElements?:any,
        ref?:any,
        duplicate?
    }):void{


        let {directivesZChild,random,duplicate,templateMyElements,ref} = devObj
        // subjects meeded for input handle to work
        Object
        .keys(directivesZChild)
        .forEach((x,i)=>{
            if(directivesZChild[x].extras !== undefined && directivesZChild[x].extras !== null ){

                if( directivesZChild[x].extras.appDropDown !== undefined){
                    if(   directivesZChild[x].extras.appDropDown.change !== "dropdowns"){
                        directivesZChild[x].extras.appDropDown.zSymbol = x
                    }
                }
                // if zSymbolNeeded is "true" provide the zSymbol
                    // above is deprecated
                Object.values(directivesZChild[x].extras)
                .forEach((y:any,j)=>{
                    y?.zSymbolNeeded === "true" ? y.zSymbol = x : null
                })
                //
            }
        })
        this.ryber[this.appTV.valueOf()].metadata.zChildrenSubject.next(({directivesZChild,random,templateMyElements,ref}))

    }

    private inputHandleModifyName(devObj:{
        group:any, // part of deltaNODE
        current:any,
        inputZChild:zChildren
    }):void{
		let {group,current,inputZChild} = devObj
		// componentConsole({
		// 	appTV:this.appTV,
		// 	target:["formCO1"],
		// 	data:devObj
		// })?.()
        if(group !== undefined && current.intent === 'add' && current.hook === 'done'){
            group.symbols[current.count]
            ?.forEach((x,i)=>{
                if(inputZChild[x].extras.appInputHandle === undefined){
                    return
                }
                else if(inputZChild[x].extras.appInputHandle.name !== group.elements[0][i].extras.appInputHandle.name ){
                    return
                }
                inputZChild[x].extras.appInputHandle.name += "_" + current.count
            })
        }
    }

    private dynamicPosition(
    devObj:{
        deltaDiff:number, // spacing between dynamics
        group:any,// deltaNode group
        zChild:zChildren,
        deltaNodeSite?:any
        current:any // deltaNode current current
        attachVal:string //zChildKey
        zChildKeys:Array<string>
        type?:string,
        section?:any
        keep?:any,
		customFn?:Function,
		cmsZKeys?:any
    }):any{
        let {keep,section,deltaDiff,group,zChild,current,attachVal,type,zChildKeys,customFn,deltaNodeSite,cmsZKeys} = devObj
		let zChildMovingKeys = zChildKeys
		// console.log(devObj)
        if(group !== undefined && deltaNodeSite !== undefined){

            Object.keys(group)
            .forEach((x,i)=>{
                let myGroup = deltaNodeSite[x.valueOf()]

                if( myGroup !== undefined){
                    myGroup
                    .symbols
                    .forEach((y,j)=>{

                        let {delta} = minMaxDelta({
                            items:myGroup.elements[j]
                            .filter((z:any,k)=>{

                                return z.extras?.appNest?.confirm !== "true"
                            }),
                            min:(item)=>{
                                return numberParse(item.css["top"])
                            },
                            max:(item)=>{
                                return numberParse(item.css["top"]) +
                                numberParse(item.css["height"])
                            }
                        })
                        delta  += deltaDiff
                        y.forEach((z,k) => {
                            if(zChild[z].extras?.appNest?.confirm === "true"){
                                return
                            }
                            zChild[z].css["top"] = (
                                numberParse(myGroup.elements[j][k].css["top"]) +
                                (
                                    delta *
                                    (j +1)
                                )
                            ).toString() + "px"
                        })
                        this.ref.detectChanges()
                        myGroup.extras[j].positioned = 'true'
                    })

                    let j = (myGroup.intent[myGroup.intent.length-1] === 'minus' && myGroup.hook[myGroup.hook.length-1] === 'prepare') ?
                    myGroup.symbols.length-2 :
                    myGroup.symbols.length-1


                    let y = j !== -1 ?
                    myGroup.symbols[j]:
                    myGroup.elements[0]

					let attach =  (j !== -1 ? y[y.length-1] : attachVal)
					if(zChild[attach]?.extras?.judima?.formatIgnore === "true" && cmsZKeys !== undefined){
						attach = cmsZKeys[cmsZKeys.indexOf(zChildKeys[0])-1]
					}
					// prevent non format items from picking up in stack, top level wont go behind nested elements
					zChildKeys.unshift(attach)


                    keep
                    .forEach((z,k)=>{
						// if( z[1] === "replace me"){
						// 	if( zChild[attach].extras?.judima?.formatIgnore !== "true"){
						// 		z[1] = attach
						// 	}
						// 	else if(  zChild[attach].extras?.judima?.formatIgnore === "true"){
						// 		z[1]= keep[0][0] //instead find the proper attachval
						// 	}
						// }
						if( z[1] === "replace me"){
							z[1] = attach
						}

					})


					//
                    // console.log(keep)


                    if(type === 'stack' || type === undefined){


                        let zChildKeys =zChildMovingKeys
                        .filter((z:any,k)=>{
							return zChild[z]?.extras?.judima?.formatIgnore !=="true"
                        })


						// let movingAlign = align
						// .map((z:any,k)=>{
						// 	return z.map((w:any,h)=>{
						// 		return [w,k]
						// 	})
						// })
						// .flat()
						// movingAlign = movingAlign.slice(movingAlign .map((z:any,k)=>{
						// 	return z[0]
						// }).indexOf(keep[0][0]))

						let heightInclude = [...Array.from((zChildKeys),(z,k)=> {
							// componentConsole.call(this,{
							// 	target:['formCO1'],
							// 	data:{z,b:movingAlign[k]}
							// })?.()
							// if(movingAlign[k][1] === 1 && movingAlign[k][0] === z){
							// 	return 'f'
							// }
							return 't'
						})]
						// componentConsole.call(this,{
						// 	target:['formCO1'],
						// 	data:{heightInclude,keep}
						// })?.()
                        stack({
                            zChildKeys,
                            ref: this.ref,
                            zChild,
                            spacing:[null,...Array.from(Array(zChildKeys.length),(z,k)=> {
                                if(
                                    zChild[zChildKeys[k+1]]?.cssDefault?.top !== "0px" &&
                                    zChild[zChildKeys[k+1]]?.cssDefault?.top !== undefined
                                ){
                                    return numberParse(zChild[zChildKeys[k+1]]?.cssDefault?.top)
                                }
                                return section.stack
                            })],
                            // spacing:[null,section.stack],
                            keep,
                            type:'keepSomeAligned',
                            heightInclude
                        })
                        this.ref.detectChanges()
                    }

                    else if(type === 'custom'){
                        customFn({
                            attach
                        })
                    }
                }
            })


        }
    }

    private zChildInit(devObj?): any {
        return componentBootstrap({
            appTV: this.appTV,
            myElements: this.templateMyElements._results,
            ryber: this.ryber,
            zProps: {
                extras: 'true',
                val:'true',
                quantity:'true'
            }
        });
    }

    private staticZKeysGen(staticZChild:zChildren): Array<string>{
        return Object
        .entries(staticZChild)
        .filter((x:any,i)=>{
            return x[1].quantity === 3
        })
        .map((x,i)=>{return x[0]})
        .slice(2)
    }

    private toPlace (staticZChild:zChildren) : any{
        return  Object.keys(staticZChild)
        .filter((x,i)=>{  return x.match("&#") !== null })
        .slice(2)
        .forEach((x,i)=>{
            dragElement(staticZChild[x].element)
        })
    }

    private highlights (staticZChild:zChildren,amount:number): void{
        Array.from(Array(2),(x,i)=> {return "&#" +(8354 + i)})
        .forEach((x,i)=>{
            staticZChild[x].css["background-color"]= "red"
        })
    }

    private currentScroll(staticZChild:zChildren,reverse?:number): void{
        let current = null
        if( reverse === undefined){
        }
        else{
            current = Object
            .keys(staticZChild)
            .reduce((acc,x,i,src)=>{
                if(i ===  reverse){
                    acc = x
                }
                return acc
            })
        }
        scrollTo(0,numberParse(getComputedStyle(staticZChild[current === null ? "&#8353" :current].element).top)-30)
    }
}

