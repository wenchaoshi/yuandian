import card_bg_1 from '@/images/card1.png'
import card_bg_2 from '@/images/card2.png'
import card_bg_3 from '@/images/card3.png'
import card_bg_4 from '@/images/card4.png'
import card_bg_5 from '@/images/card5.png'
import card_bg_6 from '@/images/card6.png'
import card_bg_7 from '@/images/card7.png'

import card_icon_2 from '@/images/card2-icon.png'
import card_icon_3 from '@/images/card3-icon.png'
import card_icon_5 from '@/images/card5-icon.png'
import card_icon_6 from '@/images/card6-icon.png'
import card_icon_7 from '@/images/card7-icon.png'




let options=[
    // type1:
    {
      text:{
        color:'#fff',
        textAlign:'end',
        company:{
          x:315,
          y:37,
          fontSize:14
        },
        name:{
          x:315,
          y:137,
          fontSize:14
        },
        job:{
          x:315,
          y:153,
          fontSize:10
        },
        phone:{
          x:0,
          y:0,
          fontSize:14
        }
      },
      bg:{
        src: card_bg_1,
        w:335,
        h:184,
        x:0,
        y:0
      },
      line:{
        x1:206,
        y1:162,
        x2:355,
        y2:162,
        color:"rgba(255,255,255,.4)"
      },
      wxCode:{
        w:68,
        h:68,
        x:28,
        y:58
      },
      icon:{
        off:true,
        src:card_icon_2,
        w:0,
        h:0,
        x:0,
        y:0
      }
    },
    // type2:
    {
      text:{
        color:'#fff',
        textAlign:'start',
        company:{
          x:27,
          y:30,
          fontSize:12
        },
        name:{
          x:27,
          y:65,
          fontSize:14
        },
        job:{
          x:133,
          y:65,
          fontSize:10
        },
        phone:{
          x:45,
          y:92,
          fontSize:10
        }
      },
      bg:{
        src:card_bg_2,
        w:335,
        h:184,
        x:0,
        y:0
      },
      wxCode:{
        w:54,
        h:54,
        x:256,
        y:103
      },
      icon:{
        src:card_icon_2,
        w:12,
        h:14,
        x:27,
        y:81
      },
      line:{
        x1:28,
        y1:74,
        x2:173,
        y2:74,
        color:"#765096"
      },
    },
    // type3:
    {
      text:{
        color:'#08544F',
        textAlign:'end',
        company:{
          x:167.5,
          y:169,
          fontSize:10,
          textAlign:'center'
        },
        name:{
          x:315,
          y:92,
          fontSize:16
        },
        job:{
          x:315,
          y:113,
          fontSize:10
        },
        phone:{
          x:315,
          y:132,
          fontSize:10
        }
      },
      bg:{
        src:card_bg_3,
        w:335,
        h:184,
        x:0,
        y:0
      },
      line:{
        x1:20,
        y1:145,
        x2:315,
        y2:145,
        color:"#08544F"
      },
      wxCode:{
        w:69,
        h:69,
        x:20,
        y:66
      },
      icon:{
        src:card_icon_3,
        w:14,
        h:14,
        x:230,
        y:121
      }
    },
    // type4:
    {
      text:{
        off:true,
        color:'#fff',
        textAlign:'start',
        company:{
          x:27,
          y:30,
          fontSize:12
        },
        name:{
          x:27,
          y:65,
          fontSize:14
        },
        job:{
          x:133,
          y:65,
          fontSize:10
        },
        phone:{
          x:45,
          y:85,
          fontSize:10
        }
      },
      bg:{
        src:card_bg_4,
        w:335,
        h:385,
        x:0,
        y:0
      },
      line:{
        x1:20,
        y1:145,
        x2:315,
        y2:145,
        color:"#08544F"
      },
      wxCode:{
        w:81,
        h:81,
        x:224,
        y:276
      },
      icon:{
        off:true,
        src:card_icon_2,
        w:14,
        h:14,
        x:230,
        y:121
      }
    },
    // type5:
    {
      text:{
        color:'#559742',
        textAlign:'start',
        company:{
          x:27,
          y:30,
          fontSize:0
        },
        name:{
          x:23,
          y:110,
          fontSize:16
        },
        job:{
          x:23,
          y:128,
          fontSize:10
        },
        phone:{
          x:42,
          y:160,
          fontSize:10
        }
      },
      bg:{
        src:card_bg_5,
        w:335,
        h:184,
        x:0,
        y:0
      },
      line:{
        x1:24,
        y1:142,
        x2:143,
        y2:142,
        color:"#559742"
      },
      wxCode:{
        w:60,
        h:60,
        x:259,
        y:16
      },
      icon:{
        src:card_icon_5,
        w:12,
        h:13,
        x:24,
        y:150
      }    
    },
    // type6:
    {
      text:{
        color:'#273E49',
        textAlign:'start',
        company:{
          x:183,
          y:203,
          fontSize:11
        },
        name:{
          x:20,
          y:155,
          fontSize:14
        },
        job:{
          x:20,
          y:175,
          fontSize:11
        },
        phone:{
          x:36,
          y:203,
          fontSize:11
        }
      },
      bg:{
        src:card_bg_6,
        w:335,
        h:217,
        x:0,
        y:0
      },
      line:{
        x1:20,
        y1:186,
        x2:315,
        y2:186,
        color:"#273E49"
      },
      wxCode:{
        w:54,
        h:54,
        x:250,
        y:109
      },
      icon:{
        src:card_icon_6,
        w:12,
        h:12,
        x:20,
        y:193
      }    
    },
    // type7:
    {
      text:{
        color:'#fff',
        textAlign:'start',
        company:{
          x:185,
          y:170,
          fontSize:11
        },
        name:{
          x:20,
          y:125,
          fontSize:14
        },
        job:{
          x:20,
          y:145,
          fontSize:11
        },
        phone:{
          x:36,
          y:170,
          fontSize:11
        }
      },
      bg:{
        src:card_bg_7,
        w:335,
        h:183,
        x:0,
        y:0
      },
      line:{
        x1:20,
        y1:155,
        x2:315,
        y2:155,
        color:"#08544F"
      },
      wxCode:{
        w:64,
        h:64,
        x:250,
        y:75
      },
      icon:{
        src:card_icon_7,
        w:12,
        h:12,
        x:20,
        y:160
      }    
    }
  ]



export default options;