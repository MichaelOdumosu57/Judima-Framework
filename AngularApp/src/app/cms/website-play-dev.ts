let website:any = {}

website.convertCMS = [

    {
        "title": "webRTCVideo",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
                // "height":"1000",
                "background": "rgb(255, 179, 204)",
                "googleSheets": {}
            },
            {
                "key": "Heading",
                "value": "Welcome to the BigQuery Management Page",
                "type": "title",
                "split": "9",
                // "width":"420",
                "googleSheets": {}
            },
            {
                "key": "Choose-Schema",
                "type": "div",
                "value":"",
                "background":"yellow",
                // "split": "3",
                "nestGroup":"schemas",
                "nest":"A1",
                "width":"1600",
                "height":"700",
                "googleSheets": {},
                "options":{
                    "css":{
                        display:"flex",
                        "flex-direction":"row",
                        "justify-content":"space-around",
                        "align-items":"flex-start",
                        "flex-wrap":"wrap"
                    }
                }
            },
            {
                "key": "add-me",
                "type": "sub-heading",
                "value":"Add me",
                // "split": "3",
                "nestGroup":"schemas",
                "nestUnder":"A1",
                "nest":"B1",
                "width":"1600",
                // "height":"250",
                "googleSheets": {},
                "text-align":"center",
                "options":{
                    "css":{
                        "justify-self":"center",

                        // "flex-grow":"10",
                        "width":"100%"
                        // "flex-basis":"500px"
                    }
                }
            },
            {
                "key": "my-table",
                "type": "simpleTable",
                "value":"",
                "nestGroup":"schemas",
                "nestUnder":"A1",
                "nest":"B2",
                "background":"blue",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        "height":"300px",
                        "width":"400px",
                        "order":1
                    }
                }
            },
            {
                "key": "my-input-counter",
                "type": "count",
                "value":"1.",
                "nestGroup":"schemas",
                // "multipleGroup":"schemasInput",
                "nestUnder":"C1",
                "nest":"D1",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:-3,
                        "width":"10px"
                        // "background":"white",
                        // "height":"30px",
                        // "width":"400px",
                    }
                }
            },
            {
                "key": "my-input",
                "type": "input",
                "value":"",
                "nestGroup":"schemas",
                "nestUnder":"C1",
                "nest":"D1",
                // "multipleGroup":"schemasInput",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:-2,
                        "background":"white",
                        "height":"50px",
                        "width":"400px",
                    }
                }
            },
            {
                "key": "form-item-container",
                "type": "div",
                "value":"",
                // "background":"red",
                // "split": "3",
                "multipleGroup":"schemasInput",
                "nestGroup":"schemas",
                "nest":"C1",
                "nestUnder":"B3",
                // "width":"1200",
                "height":"350",
                "googleSheets": {},
                "options":{
                    "css":{
                        order:-2,
                        // "width":"75%",
                        "border":"1px solid red",
                        "width":"400px",
                        "height":"50px",
                        display:"flex",
                        "flex-direction":"row",
                        "overflow":"none"
                        // "justify-content":"space-between",
                        // "flex-wrap":"wrap"
                    }
                }
            },
            {
                "key": "add-schema",
                "type": "add button",
                "value":"Add Another",
                "nestGroup":"schemas",
                "multipleGroup":"schemasInput",
                "nestUnder":"B3",
                "nest":"C2",
                "split": "3",
                // "left":"0",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        // order:-1,

                        // "background":"white",
                        // "height":"30px",
                        // "width":"400px",
                    }
                }
            },
            {
                "key": "remove-schema",
                "type": "remove button",
                "value":"Remove Another",
                "multipleGroup":"schemasInput",
                "nestGroup":"schemas",
                "nestUnder":"B3",
                "nest":"C3",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:0,
                        // "background":"white",
                        // "height":"30px",
                        // "width":"400px",
                    }
                }
            },
            {
                "key": "input-container",
                "type": "div",
                "value":"",
                "background":"cyan",
                // "split": "3",
                "nestGroup":"schemas",
                "nest":"B3",
                "nestUnder":"A1",
                // "width":"1200",
                "height":"350",
                "googleSheets": {},
                "options":{
                    "css":{
                        order:2,
                        // "width":"75%",
                        "width":"800px",
                        "height":"300px",
                        display:"flex",
                        "flex-direction":"column",
                        "justify-content":"space-between",
                        // "flex-wrap":"wrap"
                    }
                }
            },
            {
                "key": "schema-mode",
                "type": "input",
                "value":"Mode Type",
                "newline":[
                    "REPEATED",
                    "REQUIRED",
                    "NULLABLE"
                ],
                "fontSize":"120",
                "latch":"",
                // "multipleGroup":"schemasInput",
                "split": "3",
                // "width":"300",
                "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:-2,
                        "background":"white",
                        "height":"50px",
                        // "width":"400px",
                    }
                }
            },
            {
                "key": "schema-mode-1",
                "type": "input",
                "value":"Mode Type",
                "fontSize":"120",
                "latch":"",
                // "multipleGroup":"schemasInput",
                "split": "5",
                // "width":"300",
                "height":"550",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:-2,
                        "background":"white",
                        "height":"50px",
                        // "width":"400px",
                    }
                }
            },
            {
                "key": "counter",
                "type": "count",
                "value":"1.",
                // "multipleGroup":"view",
                "next":"true",
                "split": "1",
                // "width":"300",
                "top":-200,
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        // order:-3,
                        "width":"10px"
                        // "background":"white",
                        // "height":"30px",
                        // "width":"400px",
                    }
                }
            },
            // {
            //     "key": "add",
            //     "type": "add button",
            //     "value":"Add ",
            //     "multipleGroup":"view",
            //     "next":"true",
            //     // "nestUnder":"A1",
            //     // "nest":"B3",
            //     "split": "3",
            //     // "left":"0",
            //     // "width":"300",
            //     // "height":"250",
            //     "googleSheets": {},
            //     "options":{
            //         "css":{
            //             // "justify-self":"flex-start",
            //             // "flex-grow":"1"
            //             // order:-1,

            //             // "background":"white",
            //             // "height":"30px",
            //             // "width":"100%",
            //         }
            //     }
            // },
            // {
            //     "key": "remove",
            //     "type": "remove button",
            //     "value":"Remove",
            //     "multipleGroup":"view",
            //     // "nestGroup":"view",
            //     // "nestUnder":"A1",
            //     // "nest":"B4",
            //     "split": "3",
            //     // "width":"300",
            //     // "height":"250",
            //     "googleSheets": {},
            //     "options":{
            //         "css":{
            //             // "justify-self":"flex-start",
            //             // "flex-grow":"1"
            //             order:0,
            //             // "background":"white",
            //             // "height":"30px",
            //             // "width":"100%",
            //         }
            //     }
            // },
            {
                "key": "schema-dropdown",
                "type": "dropdown",
                "value":"Mode Type",
                "newline":[
                    "REPEATED",
                    "REQUIRED",
                    "NULLABLE"
                ],
                "fontSize":"120",
                "latch":"",
                "top":-200,
                // "multipleGroup":"schemasInput",
                "split": "3",
                // "width":"300",
                "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        // order:-2,
                        "background":"blue",
                        "height":"50px",
                        // "width":"400px",
                    }
                }
            },


        ]
	},
    {
        "title": "webRTCVideo",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
                // "height":"1000",
                "background": "rgb(155, 9, 104)",
				"googleSheets": {},
				options:{
					css:{
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
            },
            {
                "key": "my-input-counter",
                "type": "count",
                "value":"1.",
                "multipleGroup":"view",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:-3,
                        "width":"10px"
                        // "background":"white",
                        // "height":"30px",
                        // "width":"400px",
                    }
                }
            },
            {
                "key": "add",
                "type": "add button",
                "value":"Add ",
                "multipleGroup":"view",
                "next":"true",
                // "nestUnder":"A1",
                // "nest":"B3",
                "split": "3",
                // "left":"0",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        // order:-1,

                        // "background":"white",
                        // "height":"30px",
                        // "width":"100%",
                    }
                }
            },
            {
                "key": "remove",
                "type": "remove button",
                "value":"Remove",
                "multipleGroup":"view",
                // "nestGroup":"view",
                // "nestUnder":"A1",
                // "nest":"B4",
                "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:0,
                        // "background":"white",
                        // "height":"30px",
                        // "width":"100%",
                    }
                }
			},
            {
                "key": "localVideo",
                "value": "",
                "type": "video",
                "options":{
                    "css":{
                        // filter: "blur(20px) invert(1) opacity(0.5)"
                        // filter:"hue-rotate(180deg) saturate(200%);"
                    }
                },
                "split": "5",
                // "width":"420",
                "height":500,
                "googleSheets": {},
                webRTC:{
                    item:"localVideo"
                }
            },
            {
                "key": "remoteVideo",
                "value": "",
                "type": "video",
                "nestGroup":"webRTC",
                "nestUnder":"A1",
                "nest":"B1",
                "options":{
                    "css":{
                        width:"inherit",
                        height:"300px"
                        // filter: "blur(20px) invert(1) opacity(0.5)"
                        // filter:"hue-rotate(180deg) saturate(200%);"
                    }
                },
                "split": "4",
                // "width":"420",
                // "height":500,
                "googleSheets": {},
                webRTC:{
                    item:"remoteVideo"
                }
            },
            {
                "key": "remoteVideoContainer",
                "value": "",
                "type": "div",
                "nestGroup":"webRTC",
                "nest":"A1",
                "options":{
                    "css":{
                        background:"purple",
                        overflow:"hidden"
                        // filter: "blur(20px) invert(1) opacity(0.5)"
                        // filter:"hue-rotate(180deg) saturate(200%);"
                    }
                },
                "split": "4",
                "width":"420",
                "height":300,
                "googleSheets": {},
                webRTC:{
                    item:"remoteVideo"
                }
            },


            {
                "key": "startButton",
                "value": "Start",
                "type": "button",

                "split": "3",
                // "width":"420",
                "googleSheets": {},
                webRTC:{
                    item:"startButton"
                }
            },
            {
                "key": "callButton",
                "value": "Call",
                "type": "button",

                "split": "3",
                // "width":"420",
                "googleSheets": {},
                webRTC:{
                    item:"callButton"
                }
            },
            {
                "key": "hangupButton",
                "value": "Hang Up",
                "type": "button",

                "split": "3",
                // "width":"420",
                "googleSheets": {},
                webRTC:{
                    item:"hangupButton"
                }
            },
            {
                "key": "Choose-Schema",
                "type": "div",
                "value":"",
                "background":"yellow",
                // "split": "3",
                "nestGroup":"schemas",
                "nest":"A1",
                "width":"1600",
                "height":"700",
                "googleSheets": {},
                "options":{
                    "css":{
                        display:"flex",
                        "flex-direction":"row",
                        "justify-content":"space-around",
                        "align-items":"flex-start",
                        "flex-wrap":"wrap"
                    }
                }
            },
            {
                "key": "add-me",
                "type": "sub-heading",
                "value":"Add me",
                // "split": "3",
                "nestGroup":"schemas",
                "nestUnder":"A1",
                "nest":"B1",
                "width":"1600",
                // "height":"250",
                "googleSheets": {},
                "text-align":"center",
                "options":{
                    "css":{
                        "justify-self":"center",

                        // "flex-grow":"10",
                        "width":"100%"
                        // "flex-basis":"500px"
                    }
                }
            },
            {
                "key": "my-table",
                "type": "simpleTable",
                "value":"",
                "nestGroup":"schemas",
                "nestUnder":"A1",
                "nest":"B2",
                "background":"blue",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        "height":"300px",
                        "width":"400px",
                        "order":1
                    }
                }
            },
            {
                "key": "my-input-counter",
                "type": "count",
                "value":"1.",
                "nestGroup":"schemas",
                // "multipleGroup":"schemasInput",
                "nestUnder":"C1",
                "nest":"D1",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:-3,
                        "width":"10px"
                        // "background":"white",
                        // "height":"30px",
                        // "width":"400px",
                    }
                }
            },
            {
                "key": "my-input",
                "type": "input",
                "value":"",
                "nestGroup":"schemas",
                "nestUnder":"C1",
                "nest":"D1",
                // "multipleGroup":"schemasInput",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:-2,
                        "background":"white",
                        "height":"50px",
                        "width":"400px",
                    }
                }
            },
            {
                "key": "form-item-container",
                "type": "div",
                "value":"",
                // "background":"red",
                // "split": "3",
                "multipleGroup":"schemasInput",
                "nestGroup":"schemas",
                "nest":"C1",
                "nestUnder":"B3",
                // "width":"1200",
                "height":"350",
                "googleSheets": {},
                "options":{
                    "css":{
                        order:-2,
                        // "width":"75%",
                        "border":"1px solid red",
                        "width":"400px",
                        "height":"50px",
                        display:"flex",
                        "flex-direction":"row",
                        "overflow":"none"
                        // "justify-content":"space-between",
                        // "flex-wrap":"wrap"
                    }
                }
            },
            {
                "key": "add-schema",
                "type": "add button",
                "value":"Add Another",
                "nestGroup":"schemas",
                "multipleGroup":"schemasInput",
                "nestUnder":"B3",
                "nest":"C2",
                "split": "3",
                // "left":"0",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        // order:-1,

                        // "background":"white",
                        // "height":"30px",
                        // "width":"400px",
                    }
                }
            },
            {
                "key": "remove-schema",
                "type": "remove button",
                "value":"Remove Another",
                "multipleGroup":"schemasInput",
                "nestGroup":"schemas",
                "nestUnder":"B3",
                "nest":"C3",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:0,
                        // "background":"white",
                        // "height":"30px",
                        // "width":"400px",
                    }
                }
            },
            {
                "key": "input-container",
                "type": "div",
                "value":"",
                "background":"cyan",
                // "split": "3",
                "nestGroup":"schemas",
                "nest":"B3",
                "nestUnder":"A1",
                // "width":"1200",
                "height":"350",
                "googleSheets": {},
                "options":{
                    "css":{
                        order:2,
                        // "width":"75%",
                        "width":"800px",
                        "height":"300px",
                        display:"flex",
                        "flex-direction":"column",
                        "justify-content":"space-between",
                        // "flex-wrap":"wrap"
                    }
                }
            },






        ]
    },

]


export default website


