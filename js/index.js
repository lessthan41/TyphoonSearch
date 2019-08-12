var dashboard;
var get = {
  "FRANCISCO": {
    "CWB": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 20.0,
          "longitude": 153.0,
          "radius": 50000
        },
        "point10": {
          "latitude": 28.7,
          "longitude": 141.7,
          "radius": 162500
        },
        "point11": {
          "latitude": 29.4,
          "longitude": 139.9,
          "radius": 175000
        },
        "point12": {
          "latitude": 29.9,
          "longitude": 138.0,
          "radius": 187500
        },
        "point13": {
          "latitude": 30.5,
          "longitude": 136.1,
          "radius": 200000
        },
        "point14": {
          "latitude": 30.8,
          "longitude": 134.4,
          "radius": 212500
        },
        "point15": {
          "latitude": 31.2,
          "longitude": 133.0,
          "radius": 225000
        },
        "point16": {
          "latitude": 31.8,
          "longitude": 131.9,
          "radius": 237500
        },
        "point17": {
          "latitude": 32.8,
          "longitude": 130.6,
          "radius": 250000
        },
        "point18": {
          "latitude": 34.7,
          "longitude": 129.6,
          "radius": 262500
        },
        "point19": {
          "latitude": 35.3,
          "longitude": 129.4,
          "radius": 275000
        },
        "point2": {
          "latitude": 21.0,
          "longitude": 151.8,
          "radius": 62500
        },
        "point20": {
          "latitude": 36.8,
          "longitude": 128.9,
          "radius": 287500
        },
        "point21": {
          "latitude": 37.8,
          "longitude": 128.7,
          "radius": 300000
        },
        "point3": {
          "latitude": 21.5,
          "longitude": 151.5,
          "radius": 75000
        },
        "point4": {
          "latitude": 22.8,
          "longitude": 150.3,
          "radius": 87500
        },
        "point5": {
          "latitude": 24.1,
          "longitude": 148.6,
          "radius": 100000
        },
        "point6": {
          "latitude": 25.2,
          "longitude": 147.5,
          "radius": 112500
        },
        "point7": {
          "latitude": 26.2,
          "longitude": 146.0,
          "radius": 125000
        },
        "point8": {
          "latitude": 26.8,
          "longitude": 144.7,
          "radius": 137500
        },
        "point9": {
          "latitude": 27.4,
          "longitude": 143.2,
          "radius": 150000
        }
      }
    },
    "HKO": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 29.4,
          "longitude": 140.0,
          "radius": 50000
        },
        "point10": {
          "latitude": 35.2,
          "longitude": 129.4,
          "radius": 254543
        },
        "point11": {
          "latitude": 35.2,
          "longitude": 129.4,
          "radius": 277270
        },
        "point12": {
          "latitude": 35.2,
          "longitude": 129.4,
          "radius": 299997
        },
        "point2": {
          "latitude": 29.7,
          "longitude": 138.1,
          "radius": 72727
        },
        "point3": {
          "latitude": 30.4,
          "longitude": 136.1,
          "radius": 95454
        },
        "point4": {
          "latitude": 30.8,
          "longitude": 134.5,
          "radius": 118181
        },
        "point5": {
          "latitude": 31.2,
          "longitude": 133.1,
          "radius": 140908
        },
        "point6": {
          "latitude": 31.8,
          "longitude": 131.8,
          "radius": 163635
        },
        "point7": {
          "latitude": 32.7,
          "longitude": 130.7,
          "radius": 186362
        },
        "point8": {
          "latitude": 33.6,
          "longitude": 129.7,
          "radius": 209089
        },
        "point9": {
          "latitude": 35.2,
          "longitude": 129.4,
          "radius": 231816
        }
      }
    },
    "JMA": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 19.6,
          "longitude": 153.1,
          "radius": 50000
        },
        "point10": {
          "latitude": 28.6,
          "longitude": 141.6,
          "radius": 162500
        },
        "point11": {
          "latitude": 29.2,
          "longitude": 140.1,
          "radius": 175000
        },
        "point12": {
          "latitude": 29.8,
          "longitude": 138.3,
          "radius": 187500
        },
        "point13": {
          "latitude": 30.5,
          "longitude": 136.2,
          "radius": 200000
        },
        "point14": {
          "latitude": 30.8,
          "longitude": 134.5,
          "radius": 212500
        },
        "point15": {
          "latitude": 31.2,
          "longitude": 133.1,
          "radius": 225000
        },
        "point16": {
          "latitude": 31.8,
          "longitude": 131.9,
          "radius": 237500
        },
        "point17": {
          "latitude": 32.9,
          "longitude": 130.6,
          "radius": 250000
        },
        "point18": {
          "latitude": 33.9,
          "longitude": 129.8,
          "radius": 262500
        },
        "point19": {
          "latitude": 35.1,
          "longitude": 129.5,
          "radius": 275000
        },
        "point2": {
          "latitude": 21.0,
          "longitude": 152.1,
          "radius": 62500
        },
        "point20": {
          "latitude": 36.8,
          "longitude": 128.9,
          "radius": 287500
        },
        "point21": {
          "latitude": 36.8,
          "longitude": 128.9,
          "radius": 300000
        },
        "point3": {
          "latitude": 21.9,
          "longitude": 151.2,
          "radius": 75000
        },
        "point4": {
          "latitude": 22.8,
          "longitude": 150.3,
          "radius": 87500
        },
        "point5": {
          "latitude": 24.0,
          "longitude": 148.5,
          "radius": 100000
        },
        "point6": {
          "latitude": 24.9,
          "longitude": 147.5,
          "radius": 112500
        },
        "point7": {
          "latitude": 26.3,
          "longitude": 146.2,
          "radius": 125000
        },
        "point8": {
          "latitude": 26.7,
          "longitude": 144.8,
          "radius": 137500
        },
        "point9": {
          "latitude": 27.2,
          "longitude": 143.2,
          "radius": 150000
        }
      }
    },
    "JTWC": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 20.0,
          "longitude": 152.7,
          "radius": 50000
        },
        "point10": {
          "latitude": 28.5,
          "longitude": 141.7,
          "radius": 133331
        },
        "point11": {
          "latitude": 29.1,
          "longitude": 139.7,
          "radius": 142590
        },
        "point12": {
          "latitude": 29.9,
          "longitude": 138.1,
          "radius": 151849
        },
        "point13": {
          "latitude": 30.4,
          "longitude": 136.2,
          "radius": 161108
        },
        "point14": {
          "latitude": 30.9,
          "longitude": 134.7,
          "radius": 170367
        },
        "point15": {
          "latitude": 31.2,
          "longitude": 133.0,
          "radius": 179626
        },
        "point16": {
          "latitude": 31.7,
          "longitude": 131.9,
          "radius": 188885
        },
        "point17": {
          "latitude": 33.0,
          "longitude": 130.9,
          "radius": 198144
        },
        "point18": {
          "latitude": 34.5,
          "longitude": 129.7,
          "radius": 207403
        },
        "point19": {
          "latitude": 35.6,
          "longitude": 129.4,
          "radius": 216662
        },
        "point2": {
          "latitude": 20.9,
          "longitude": 151.9,
          "radius": 59259
        },
        "point20": {
          "latitude": 35.6,
          "longitude": 129.4,
          "radius": 225921
        },
        "point21": {
          "latitude": 38.1,
          "longitude": 128.6,
          "radius": 235180
        },
        "point22": {
          "latitude": 39.6,
          "longitude": 129.3,
          "radius": 244439
        },
        "point23": {
          "latitude": 39.6,
          "longitude": 129.3,
          "radius": 253698
        },
        "point24": {
          "latitude": 39.6,
          "longitude": 129.3,
          "radius": 262957
        },
        "point25": {
          "latitude": 39.6,
          "longitude": 129.3,
          "radius": 272216
        },
        "point26": {
          "latitude": 39.6,
          "longitude": 129.3,
          "radius": 281475
        },
        "point27": {
          "latitude": 39.6,
          "longitude": 129.3,
          "radius": 290734
        },
        "point28": {
          "latitude": 42.8,
          "longitude": 135.6,
          "radius": 299993
        },
        "point3": {
          "latitude": 21.7,
          "longitude": 151.2,
          "radius": 68518
        },
        "point4": {
          "latitude": 22.7,
          "longitude": 150.1,
          "radius": 77777
        },
        "point5": {
          "latitude": 24.2,
          "longitude": 148.6,
          "radius": 87036
        },
        "point6": {
          "latitude": 25.4,
          "longitude": 147.2,
          "radius": 96295
        },
        "point7": {
          "latitude": 26.0,
          "longitude": 145.7,
          "radius": 105554
        },
        "point8": {
          "latitude": 26.7,
          "longitude": 144.3,
          "radius": 114813
        },
        "point9": {
          "latitude": 27.5,
          "longitude": 142.9,
          "radius": 124072
        }
      }
    },
    "KMA": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 19.7,
          "longitude": 153.1,
          "radius": 50000
        },
        "point10": {
          "latitude": 28.7,
          "longitude": 141.7,
          "radius": 157136
        },
        "point11": {
          "latitude": 29.5,
          "longitude": 140.1,
          "radius": 169040
        },
        "point12": {
          "latitude": 29.9,
          "longitude": 138.3,
          "radius": 180944
        },
        "point13": {
          "latitude": 30.5,
          "longitude": 136.1,
          "radius": 192848
        },
        "point14": {
          "latitude": 30.8,
          "longitude": 134.6,
          "radius": 204752
        },
        "point15": {
          "latitude": 31.2,
          "longitude": 133.1,
          "radius": 216656
        },
        "point16": {
          "latitude": 31.8,
          "longitude": 131.8,
          "radius": 228560
        },
        "point17": {
          "latitude": 32.8,
          "longitude": 130.7,
          "radius": 240464
        },
        "point18": {
          "latitude": 33.9,
          "longitude": 129.6,
          "radius": 252368
        },
        "point19": {
          "latitude": 35.2,
          "longitude": 129.0,
          "radius": 264272
        },
        "point2": {
          "latitude": 21.0,
          "longitude": 152.0,
          "radius": 61904
        },
        "point20": {
          "latitude": 35.2,
          "longitude": 129.0,
          "radius": 276176
        },
        "point21": {
          "latitude": 35.2,
          "longitude": 129.0,
          "radius": 288080
        },
        "point22": {
          "latitude": 35.2,
          "longitude": 129.0,
          "radius": 299984
        },
        "point3": {
          "latitude": 21.8,
          "longitude": 151.2,
          "radius": 73808
        },
        "point4": {
          "latitude": 22.7,
          "longitude": 150.4,
          "radius": 85712
        },
        "point5": {
          "latitude": 24.2,
          "longitude": 148.7,
          "radius": 97616
        },
        "point6": {
          "latitude": 25.2,
          "longitude": 147.6,
          "radius": 109520
        },
        "point7": {
          "latitude": 26.3,
          "longitude": 146.1,
          "radius": 121424
        },
        "point8": {
          "latitude": 26.7,
          "longitude": 144.6,
          "radius": 133328
        },
        "point9": {
          "latitude": 27.3,
          "longitude": 143.2,
          "radius": 145232
        }
      }
    },
    "NMC": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 20.1,
          "longitude": 152.8,
          "radius": 50000
        },
        "point10": {
          "latitude": 28.6,
          "longitude": 141.6,
          "radius": 168413
        },
        "point11": {
          "latitude": 29.5,
          "longitude": 140.1,
          "radius": 181570
        },
        "point12": {
          "latitude": 29.9,
          "longitude": 138.8,
          "radius": 194727
        },
        "point13": {
          "latitude": 30.4,
          "longitude": 136.2,
          "radius": 207884
        },
        "point14": {
          "latitude": 30.8,
          "longitude": 134.5,
          "radius": 221041
        },
        "point15": {
          "latitude": 31.2,
          "longitude": 133.1,
          "radius": 234198
        },
        "point16": {
          "latitude": 31.8,
          "longitude": 131.8,
          "radius": 247355
        },
        "point17": {
          "latitude": 33.0,
          "longitude": 130.8,
          "radius": 260512
        },
        "point18": {
          "latitude": 34.0,
          "longitude": 129.8,
          "radius": 273669
        },
        "point19": {
          "latitude": 35.2,
          "longitude": 129.4,
          "radius": 286826
        },
        "point2": {
          "latitude": 20.8,
          "longitude": 151.9,
          "radius": 63157
        },
        "point20": {
          "latitude": 35.2,
          "longitude": 129.4,
          "radius": 299983
        },
        "point3": {
          "latitude": 21.7,
          "longitude": 151.4,
          "radius": 76314
        },
        "point4": {
          "latitude": 22.8,
          "longitude": 150.0,
          "radius": 89471
        },
        "point5": {
          "latitude": 24.0,
          "longitude": 148.6,
          "radius": 102628
        },
        "point6": {
          "latitude": 25.2,
          "longitude": 147.6,
          "radius": 115785
        },
        "point7": {
          "latitude": 26.1,
          "longitude": 146.4,
          "radius": 128942
        },
        "point8": {
          "latitude": 26.9,
          "longitude": 144.6,
          "radius": 142099
        },
        "point9": {
          "latitude": 27.6,
          "longitude": 143.2,
          "radius": 155256
        }
      }
    },
    "info": {
      "code": "1908",
      "en": "FRANCISCO",
      "links": "https://rdc28.cwb.gov.tw/TDB/public/typhoon_detail?typhoon_id=201908",
      "year": 2019,
      "zh": "\u8303\u65af\u9ad8"
    }
  },
  "KROSA": {
    "CWB": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 18.5,
          "longitude": 143.0,
          "radius": 50000
        },
        "point10": {
          "latitude": 22.0,
          "longitude": 140.7,
          "radius": 162500
        },
        "point11": {
          "latitude": 22.0,
          "longitude": 141.1,
          "radius": 175000
        },
        "point12": {
          "latitude": 21.9,
          "longitude": 141.1,
          "radius": 187500
        },
        "point13": {
          "latitude": 22.1,
          "longitude": 141.3,
          "radius": 200000
        },
        "point14": {
          "latitude": 22.3,
          "longitude": 141.6,
          "radius": 212500
        },
        "point15": {
          "latitude": 22.5,
          "longitude": 141.6,
          "radius": 225000
        },
        "point16": {
          "latitude": 22.7,
          "longitude": 141.4,
          "radius": 237500
        },
        "point17": {
          "latitude": 23.8,
          "longitude": 139.8,
          "radius": 250000
        },
        "point18": {
          "latitude": 25.1,
          "longitude": 137.2,
          "radius": 262500
        },
        "point19": {
          "latitude": 27.1,
          "longitude": 134.2,
          "radius": 275000
        },
        "point2": {
          "latitude": 18.8,
          "longitude": 142.6,
          "radius": 62500
        },
        "point20": {
          "latitude": 29.2,
          "longitude": 133.0,
          "radius": 287500
        },
        "point21": {
          "latitude": 32.4,
          "longitude": 132.6,
          "radius": 300000
        },
        "point3": {
          "latitude": 19.5,
          "longitude": 142.2,
          "radius": 75000
        },
        "point4": {
          "latitude": 20.6,
          "longitude": 141.7,
          "radius": 87500
        },
        "point5": {
          "latitude": 21.2,
          "longitude": 141.4,
          "radius": 100000
        },
        "point6": {
          "latitude": 21.5,
          "longitude": 141.0,
          "radius": 112500
        },
        "point7": {
          "latitude": 21.7,
          "longitude": 140.8,
          "radius": 125000
        },
        "point8": {
          "latitude": 21.9,
          "longitude": 140.5,
          "radius": 137500
        },
        "point9": {
          "latitude": 22.0,
          "longitude": 140.5,
          "radius": 150000
        }
      }
    },
    "HKO": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {}
    },
    "JMA": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 18.5,
          "longitude": 142.8,
          "radius": 50000
        },
        "point10": {
          "latitude": 22.1,
          "longitude": 140.7,
          "radius": 162500
        },
        "point11": {
          "latitude": 22.2,
          "longitude": 141.0,
          "radius": 175000
        },
        "point12": {
          "latitude": 22.1,
          "longitude": 141.1,
          "radius": 187500
        },
        "point13": {
          "latitude": 22.0,
          "longitude": 141.3,
          "radius": 200000
        },
        "point14": {
          "latitude": 22.2,
          "longitude": 141.4,
          "radius": 212500
        },
        "point15": {
          "latitude": 22.3,
          "longitude": 141.4,
          "radius": 225000
        },
        "point16": {
          "latitude": 22.7,
          "longitude": 141.3,
          "radius": 237500
        },
        "point17": {
          "latitude": 23.6,
          "longitude": 139.8,
          "radius": 250000
        },
        "point18": {
          "latitude": 25.1,
          "longitude": 137.1,
          "radius": 262500
        },
        "point19": {
          "latitude": 27.2,
          "longitude": 134.0,
          "radius": 275000
        },
        "point2": {
          "latitude": 18.9,
          "longitude": 142.4,
          "radius": 62500
        },
        "point20": {
          "latitude": 29.6,
          "longitude": 132.6,
          "radius": 287500
        },
        "point21": {
          "latitude": 33.5,
          "longitude": 132.8,
          "radius": 300000
        },
        "point3": {
          "latitude": 19.5,
          "longitude": 142.4,
          "radius": 75000
        },
        "point4": {
          "latitude": 20.5,
          "longitude": 141.9,
          "radius": 87500
        },
        "point5": {
          "latitude": 21.1,
          "longitude": 141.4,
          "radius": 100000
        },
        "point6": {
          "latitude": 21.5,
          "longitude": 141.0,
          "radius": 112500
        },
        "point7": {
          "latitude": 21.7,
          "longitude": 140.8,
          "radius": 125000
        },
        "point8": {
          "latitude": 21.9,
          "longitude": 140.5,
          "radius": 137500
        },
        "point9": {
          "latitude": 22.1,
          "longitude": 140.6,
          "radius": 150000
        }
      }
    },
    "JTWC": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 19.0,
          "longitude": 142.3,
          "radius": 50000
        },
        "point10": {
          "latitude": 22.0,
          "longitude": 141.0,
          "radius": 168413
        },
        "point11": {
          "latitude": 22.0,
          "longitude": 141.1,
          "radius": 181570
        },
        "point12": {
          "latitude": 22.0,
          "longitude": 141.2,
          "radius": 194727
        },
        "point13": {
          "latitude": 22.2,
          "longitude": 141.4,
          "radius": 207884
        },
        "point14": {
          "latitude": 22.3,
          "longitude": 141.4,
          "radius": 221041
        },
        "point15": {
          "latitude": 22.7,
          "longitude": 141.5,
          "radius": 234198
        },
        "point16": {
          "latitude": 23.6,
          "longitude": 140.1,
          "radius": 247355
        },
        "point17": {
          "latitude": 25.0,
          "longitude": 137.6,
          "radius": 260512
        },
        "point18": {
          "latitude": 26.8,
          "longitude": 134.9,
          "radius": 273669
        },
        "point19": {
          "latitude": 29.1,
          "longitude": 133.4,
          "radius": 286826
        },
        "point2": {
          "latitude": 19.6,
          "longitude": 142.1,
          "radius": 63157
        },
        "point20": {
          "latitude": 31.9,
          "longitude": 132.9,
          "radius": 299983
        },
        "point3": {
          "latitude": 20.6,
          "longitude": 141.6,
          "radius": 76314
        },
        "point4": {
          "latitude": 21.2,
          "longitude": 141.3,
          "radius": 89471
        },
        "point5": {
          "latitude": 21.6,
          "longitude": 141.1,
          "radius": 102628
        },
        "point6": {
          "latitude": 21.8,
          "longitude": 140.8,
          "radius": 115785
        },
        "point7": {
          "latitude": 22.0,
          "longitude": 140.5,
          "radius": 128942
        },
        "point8": {
          "latitude": 22.1,
          "longitude": 140.6,
          "radius": 142099
        },
        "point9": {
          "latitude": 22.2,
          "longitude": 140.8,
          "radius": 155256
        }
      }
    },
    "KMA": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 18.4,
          "longitude": 142.7,
          "radius": 50000
        },
        "point10": {
          "latitude": 22.1,
          "longitude": 140.7,
          "radius": 162500
        },
        "point11": {
          "latitude": 22.0,
          "longitude": 141.0,
          "radius": 175000
        },
        "point12": {
          "latitude": 22.0,
          "longitude": 141.1,
          "radius": 187500
        },
        "point13": {
          "latitude": 22.1,
          "longitude": 141.3,
          "radius": 200000
        },
        "point14": {
          "latitude": 22.2,
          "longitude": 141.5,
          "radius": 212500
        },
        "point15": {
          "latitude": 22.3,
          "longitude": 141.5,
          "radius": 225000
        },
        "point16": {
          "latitude": 22.7,
          "longitude": 141.3,
          "radius": 237500
        },
        "point17": {
          "latitude": 24.2,
          "longitude": 138.9,
          "radius": 250000
        },
        "point18": {
          "latitude": 25.6,
          "longitude": 136.3,
          "radius": 262500
        },
        "point19": {
          "latitude": 27.1,
          "longitude": 134.1,
          "radius": 275000
        },
        "point2": {
          "latitude": 19.2,
          "longitude": 142.6,
          "radius": 62500
        },
        "point20": {
          "latitude": 29.3,
          "longitude": 132.8,
          "radius": 287500
        },
        "point21": {
          "latitude": 31.9,
          "longitude": 133.0,
          "radius": 300000
        },
        "point3": {
          "latitude": 19.4,
          "longitude": 142.4,
          "radius": 75000
        },
        "point4": {
          "latitude": 20.1,
          "longitude": 142.0,
          "radius": 87500
        },
        "point5": {
          "latitude": 21.0,
          "longitude": 141.3,
          "radius": 100000
        },
        "point6": {
          "latitude": 21.5,
          "longitude": 141.0,
          "radius": 112500
        },
        "point7": {
          "latitude": 21.8,
          "longitude": 140.8,
          "radius": 125000
        },
        "point8": {
          "latitude": 22.0,
          "longitude": 140.5,
          "radius": 137500
        },
        "point9": {
          "latitude": 22.1,
          "longitude": 140.6,
          "radius": 150000
        }
      }
    },
    "NMC": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 18.4,
          "longitude": 142.8,
          "radius": 50000
        },
        "point10": {
          "latitude": 22.1,
          "longitude": 140.6,
          "radius": 162500
        },
        "point11": {
          "latitude": 22.1,
          "longitude": 140.9,
          "radius": 175000
        },
        "point12": {
          "latitude": 22.1,
          "longitude": 141.1,
          "radius": 187500
        },
        "point13": {
          "latitude": 22.2,
          "longitude": 141.3,
          "radius": 200000
        },
        "point14": {
          "latitude": 22.3,
          "longitude": 141.3,
          "radius": 212500
        },
        "point15": {
          "latitude": 22.4,
          "longitude": 141.4,
          "radius": 225000
        },
        "point16": {
          "latitude": 22.7,
          "longitude": 141.5,
          "radius": 237500
        },
        "point17": {
          "latitude": 23.6,
          "longitude": 139.8,
          "radius": 250000
        },
        "point18": {
          "latitude": 24.8,
          "longitude": 137.3,
          "radius": 262500
        },
        "point19": {
          "latitude": 26.9,
          "longitude": 134.2,
          "radius": 275000
        },
        "point2": {
          "latitude": 18.5,
          "longitude": 142.5,
          "radius": 62500
        },
        "point20": {
          "latitude": 29.0,
          "longitude": 132.8,
          "radius": 287500
        },
        "point21": {
          "latitude": 32.2,
          "longitude": 132.1,
          "radius": 300000
        },
        "point3": {
          "latitude": 19.4,
          "longitude": 142.4,
          "radius": 75000
        },
        "point4": {
          "latitude": 20.5,
          "longitude": 141.6,
          "radius": 87500
        },
        "point5": {
          "latitude": 21.0,
          "longitude": 141.3,
          "radius": 100000
        },
        "point6": {
          "latitude": 21.4,
          "longitude": 141.0,
          "radius": 112500
        },
        "point7": {
          "latitude": 21.7,
          "longitude": 140.7,
          "radius": 125000
        },
        "point8": {
          "latitude": 21.9,
          "longitude": 140.5,
          "radius": 137500
        },
        "point9": {
          "latitude": 22.1,
          "longitude": 140.6,
          "radius": 150000
        }
      }
    },
    "info": {
      "code": "1910",
      "en": "KROSA",
      "links": "https://rdc28.cwb.gov.tw/TDB/public/typhoon_detail?typhoon_id=201910",
      "year": 2019,
      "zh": "\u67ef\u7f85\u838e"
    }
  },
  "LEKIMA": {
    "CWB": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 17.4,
          "longitude": 131.9,
          "radius": 50000
        },
        "point10": {
          "latitude": 19.5,
          "longitude": 128.5,
          "radius": 130352
        },
        "point11": {
          "latitude": 19.7,
          "longitude": 128.2,
          "radius": 139280
        },
        "point12": {
          "latitude": 20.2,
          "longitude": 128.0,
          "radius": 148208
        },
        "point13": {
          "latitude": 21.0,
          "longitude": 127.7,
          "radius": 157136
        },
        "point14": {
          "latitude": 21.7,
          "longitude": 127.0,
          "radius": 166064
        },
        "point15": {
          "latitude": 22.1,
          "longitude": 126.4,
          "radius": 174992
        },
        "point16": {
          "latitude": 22.7,
          "longitude": 125.9,
          "radius": 183920
        },
        "point17": {
          "latitude": 23.6,
          "longitude": 125.6,
          "radius": 192848
        },
        "point18": {
          "latitude": 24.5,
          "longitude": 124.9,
          "radius": 201776
        },
        "point19": {
          "latitude": 25.4,
          "longitude": 124.5,
          "radius": 210704
        },
        "point2": {
          "latitude": 17.7,
          "longitude": 131.5,
          "radius": 58928
        },
        "point20": {
          "latitude": 26.4,
          "longitude": 123.4,
          "radius": 219632
        },
        "point21": {
          "latitude": 27.0,
          "longitude": 122.6,
          "radius": 228560
        },
        "point22": {
          "latitude": 27.5,
          "longitude": 122.0,
          "radius": 237488
        },
        "point23": {
          "latitude": 28.4,
          "longitude": 121.3,
          "radius": 246416
        },
        "point24": {
          "latitude": 28.9,
          "longitude": 120.9,
          "radius": 255344
        },
        "point25": {
          "latitude": 32.6,
          "longitude": 120.5,
          "radius": 264272
        },
        "point26": {
          "latitude": 36.0,
          "longitude": 120.1,
          "radius": 273200
        },
        "point27": {
          "latitude": 37.6,
          "longitude": 119.6,
          "radius": 282128
        },
        "point28": {
          "latitude": 38.3,
          "longitude": 120.0,
          "radius": 291056
        },
        "point29": {
          "latitude": 38.8,
          "longitude": 120.6,
          "radius": 299984
        },
        "point3": {
          "latitude": 18.4,
          "longitude": 130.5,
          "radius": 67856
        },
        "point4": {
          "latitude": 18.5,
          "longitude": 130.4,
          "radius": 76784
        },
        "point5": {
          "latitude": 18.9,
          "longitude": 129.7,
          "radius": 85712
        },
        "point6": {
          "latitude": 18.9,
          "longitude": 129.5,
          "radius": 94640
        },
        "point7": {
          "latitude": 18.8,
          "longitude": 129.2,
          "radius": 103568
        },
        "point8": {
          "latitude": 18.8,
          "longitude": 129.1,
          "radius": 112496
        },
        "point9": {
          "latitude": 19.0,
          "longitude": 129.0,
          "radius": 121424
        }
      }
    },
    "HKO": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 16.7,
          "longitude": 131.5,
          "radius": 50000
        },
        "point10": {
          "latitude": 19.5,
          "longitude": 128.5,
          "radius": 133331
        },
        "point11": {
          "latitude": 19.5,
          "longitude": 128.2,
          "radius": 142590
        },
        "point12": {
          "latitude": 20.2,
          "longitude": 128.2,
          "radius": 151849
        },
        "point13": {
          "latitude": 20.9,
          "longitude": 127.7,
          "radius": 161108
        },
        "point14": {
          "latitude": 21.6,
          "longitude": 127.0,
          "radius": 170367
        },
        "point15": {
          "latitude": 22.1,
          "longitude": 126.4,
          "radius": 179626
        },
        "point16": {
          "latitude": 22.7,
          "longitude": 126.0,
          "radius": 188885
        },
        "point17": {
          "latitude": 23.7,
          "longitude": 125.4,
          "radius": 198144
        },
        "point18": {
          "latitude": 24.4,
          "longitude": 124.9,
          "radius": 207403
        },
        "point19": {
          "latitude": 25.5,
          "longitude": 124.5,
          "radius": 216662
        },
        "point2": {
          "latitude": 17.4,
          "longitude": 131.2,
          "radius": 59259
        },
        "point20": {
          "latitude": 26.4,
          "longitude": 123.4,
          "radius": 225921
        },
        "point21": {
          "latitude": 27.1,
          "longitude": 122.5,
          "radius": 235180
        },
        "point22": {
          "latitude": 27.5,
          "longitude": 122.0,
          "radius": 244439
        },
        "point23": {
          "latitude": 28.4,
          "longitude": 121.4,
          "radius": 253698
        },
        "point24": {
          "latitude": 29.1,
          "longitude": 120.9,
          "radius": 262957
        },
        "point25": {
          "latitude": 33.4,
          "longitude": 120.4,
          "radius": 272216
        },
        "point26": {
          "latitude": 37.4,
          "longitude": 119.6,
          "radius": 281475
        },
        "point27": {
          "latitude": 38.5,
          "longitude": 119.0,
          "radius": 290734
        },
        "point28": {
          "latitude": 39.1,
          "longitude": 118.4,
          "radius": 299993
        },
        "point3": {
          "latitude": 17.9,
          "longitude": 130.6,
          "radius": 68518
        },
        "point4": {
          "latitude": 18.8,
          "longitude": 130.1,
          "radius": 77777
        },
        "point5": {
          "latitude": 19.0,
          "longitude": 129.7,
          "radius": 87036
        },
        "point6": {
          "latitude": 18.8,
          "longitude": 129.6,
          "radius": 96295
        },
        "point7": {
          "latitude": 18.7,
          "longitude": 129.2,
          "radius": 105554
        },
        "point8": {
          "latitude": 18.6,
          "longitude": 129.3,
          "radius": 114813
        },
        "point9": {
          "latitude": 19.0,
          "longitude": 129.1,
          "radius": 124072
        }
      }
    },
    "JMA": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 17.4,
          "longitude": 131.9,
          "radius": 50000
        },
        "point10": {
          "latitude": 19.6,
          "longitude": 128.2,
          "radius": 133331
        },
        "point11": {
          "latitude": 19.7,
          "longitude": 128.0,
          "radius": 142590
        },
        "point12": {
          "latitude": 20.2,
          "longitude": 128.0,
          "radius": 151849
        },
        "point13": {
          "latitude": 21.0,
          "longitude": 127.7,
          "radius": 161108
        },
        "point14": {
          "latitude": 21.6,
          "longitude": 127.0,
          "radius": 170367
        },
        "point15": {
          "latitude": 22.1,
          "longitude": 126.4,
          "radius": 179626
        },
        "point16": {
          "latitude": 22.7,
          "longitude": 125.9,
          "radius": 188885
        },
        "point17": {
          "latitude": 23.7,
          "longitude": 125.5,
          "radius": 198144
        },
        "point18": {
          "latitude": 24.3,
          "longitude": 124.9,
          "radius": 207403
        },
        "point19": {
          "latitude": 25.5,
          "longitude": 124.5,
          "radius": 216662
        },
        "point2": {
          "latitude": 17.5,
          "longitude": 130.8,
          "radius": 59259
        },
        "point20": {
          "latitude": 26.4,
          "longitude": 123.4,
          "radius": 225921
        },
        "point21": {
          "latitude": 27.1,
          "longitude": 122.5,
          "radius": 235180
        },
        "point22": {
          "latitude": 27.5,
          "longitude": 122.0,
          "radius": 244439
        },
        "point23": {
          "latitude": 28.4,
          "longitude": 121.4,
          "radius": 253698
        },
        "point24": {
          "latitude": 29.0,
          "longitude": 120.9,
          "radius": 262957
        },
        "point25": {
          "latitude": 33.3,
          "longitude": 120.8,
          "radius": 272216
        },
        "point26": {
          "latitude": 37.6,
          "longitude": 119.8,
          "radius": 281475
        },
        "point27": {
          "latitude": 38.0,
          "longitude": 119.6,
          "radius": 290734
        },
        "point28": {
          "latitude": 38.6,
          "longitude": 120.4,
          "radius": 299993
        },
        "point3": {
          "latitude": 17.9,
          "longitude": 129.7,
          "radius": 68518
        },
        "point4": {
          "latitude": 18.5,
          "longitude": 129.9,
          "radius": 77777
        },
        "point5": {
          "latitude": 19.0,
          "longitude": 129.6,
          "radius": 87036
        },
        "point6": {
          "latitude": 19.0,
          "longitude": 129.3,
          "radius": 96295
        },
        "point7": {
          "latitude": 18.8,
          "longitude": 129.3,
          "radius": 105554
        },
        "point8": {
          "latitude": 18.9,
          "longitude": 129.3,
          "radius": 114813
        },
        "point9": {
          "latitude": 19.2,
          "longitude": 129.1,
          "radius": 124072
        }
      }
    },
    "JTWC": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 16.5,
          "longitude": 131.3,
          "radius": 50000
        },
        "point10": {
          "latitude": 19.7,
          "longitude": 128.5,
          "radius": 133331
        },
        "point11": {
          "latitude": 19.5,
          "longitude": 128.2,
          "radius": 142590
        },
        "point12": {
          "latitude": 20.2,
          "longitude": 128.2,
          "radius": 151849
        },
        "point13": {
          "latitude": 20.9,
          "longitude": 127.7,
          "radius": 161108
        },
        "point14": {
          "latitude": 21.6,
          "longitude": 127.1,
          "radius": 170367
        },
        "point15": {
          "latitude": 22.1,
          "longitude": 126.4,
          "radius": 179626
        },
        "point16": {
          "latitude": 22.7,
          "longitude": 126.0,
          "radius": 188885
        },
        "point17": {
          "latitude": 23.6,
          "longitude": 125.5,
          "radius": 198144
        },
        "point18": {
          "latitude": 24.4,
          "longitude": 124.9,
          "radius": 207403
        },
        "point19": {
          "latitude": 25.5,
          "longitude": 124.6,
          "radius": 216662
        },
        "point2": {
          "latitude": 17.6,
          "longitude": 131.4,
          "radius": 59259
        },
        "point20": {
          "latitude": 26.4,
          "longitude": 123.4,
          "radius": 225921
        },
        "point21": {
          "latitude": 27.0,
          "longitude": 122.5,
          "radius": 235180
        },
        "point22": {
          "latitude": 27.5,
          "longitude": 122.1,
          "radius": 244439
        },
        "point23": {
          "latitude": 28.4,
          "longitude": 121.4,
          "radius": 253698
        },
        "point24": {
          "latitude": 29.0,
          "longitude": 121.0,
          "radius": 262957
        },
        "point25": {
          "latitude": 33.1,
          "longitude": 120.4,
          "radius": 272216
        },
        "point26": {
          "latitude": 36.6,
          "longitude": 119.9,
          "radius": 281475
        },
        "point27": {
          "latitude": 38.2,
          "longitude": 119.9,
          "radius": 290734
        },
        "point28": {
          "latitude": 39.0,
          "longitude": 120.4,
          "radius": 299993
        },
        "point3": {
          "latitude": 18.3,
          "longitude": 130.4,
          "radius": 68518
        },
        "point4": {
          "latitude": 18.8,
          "longitude": 130.1,
          "radius": 77777
        },
        "point5": {
          "latitude": 19.1,
          "longitude": 129.7,
          "radius": 87036
        },
        "point6": {
          "latitude": 18.7,
          "longitude": 129.4,
          "radius": 96295
        },
        "point7": {
          "latitude": 18.6,
          "longitude": 129.0,
          "radius": 105554
        },
        "point8": {
          "latitude": 18.8,
          "longitude": 129.1,
          "radius": 114813
        },
        "point9": {
          "latitude": 19.1,
          "longitude": 129.0,
          "radius": 124072
        }
      }
    },
    "KMA": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 16.8,
          "longitude": 131.3,
          "radius": 50000
        },
        "point10": {
          "latitude": 19.6,
          "longitude": 128.5,
          "radius": 136535
        },
        "point11": {
          "latitude": 19.7,
          "longitude": 127.9,
          "radius": 146150
        },
        "point12": {
          "latitude": 20.2,
          "longitude": 127.9,
          "radius": 155765
        },
        "point13": {
          "latitude": 21.0,
          "longitude": 127.7,
          "radius": 165380
        },
        "point14": {
          "latitude": 21.6,
          "longitude": 127.0,
          "radius": 174995
        },
        "point15": {
          "latitude": 22.1,
          "longitude": 126.4,
          "radius": 184610
        },
        "point16": {
          "latitude": 22.7,
          "longitude": 125.9,
          "radius": 194225
        },
        "point17": {
          "latitude": 23.7,
          "longitude": 125.5,
          "radius": 203840
        },
        "point18": {
          "latitude": 24.4,
          "longitude": 124.9,
          "radius": 213455
        },
        "point19": {
          "latitude": 25.4,
          "longitude": 124.5,
          "radius": 223070
        },
        "point2": {
          "latitude": 17.5,
          "longitude": 130.3,
          "radius": 59615
        },
        "point20": {
          "latitude": 26.4,
          "longitude": 123.4,
          "radius": 232685
        },
        "point21": {
          "latitude": 27.0,
          "longitude": 122.5,
          "radius": 242300
        },
        "point22": {
          "latitude": 27.5,
          "longitude": 122.0,
          "radius": 251915
        },
        "point23": {
          "latitude": 28.4,
          "longitude": 121.4,
          "radius": 261530
        },
        "point24": {
          "latitude": 29.0,
          "longitude": 120.9,
          "radius": 271145
        },
        "point25": {
          "latitude": 33.2,
          "longitude": 120.5,
          "radius": 280760
        },
        "point26": {
          "latitude": 37.1,
          "longitude": 120.1,
          "radius": 290375
        },
        "point27": {
          "latitude": 38.9,
          "longitude": 120.0,
          "radius": 299990
        },
        "point3": {
          "latitude": 17.9,
          "longitude": 129.7,
          "radius": 69230
        },
        "point4": {
          "latitude": 18.8,
          "longitude": 130.0,
          "radius": 78845
        },
        "point5": {
          "latitude": 18.8,
          "longitude": 129.6,
          "radius": 88460
        },
        "point6": {
          "latitude": 18.6,
          "longitude": 129.3,
          "radius": 98075
        },
        "point7": {
          "latitude": 18.5,
          "longitude": 129.1,
          "radius": 107690
        },
        "point8": {
          "latitude": 18.9,
          "longitude": 128.9,
          "radius": 117305
        },
        "point9": {
          "latitude": 19.3,
          "longitude": 128.8,
          "radius": 126920
        }
      }
    },
    "NMC": {
      "parameter": {
        "month": 0,
        "n": 5,
        "w": ""
      },
      "points": {
        "point1": {
          "latitude": 17.4,
          "longitude": 131.3,
          "radius": 50000
        },
        "point10": {
          "latitude": 19.8,
          "longitude": 128.2,
          "radius": 136535
        },
        "point11": {
          "latitude": 20.2,
          "longitude": 128.1,
          "radius": 146150
        },
        "point12": {
          "latitude": 20.9,
          "longitude": 127.7,
          "radius": 155765
        },
        "point13": {
          "latitude": 21.6,
          "longitude": 127.0,
          "radius": 165380
        },
        "point14": {
          "latitude": 22.1,
          "longitude": 126.4,
          "radius": 174995
        },
        "point15": {
          "latitude": 22.7,
          "longitude": 125.9,
          "radius": 184610
        },
        "point16": {
          "latitude": 23.7,
          "longitude": 125.5,
          "radius": 194225
        },
        "point17": {
          "latitude": 24.4,
          "longitude": 125.0,
          "radius": 203840
        },
        "point18": {
          "latitude": 25.4,
          "longitude": 124.5,
          "radius": 213455
        },
        "point19": {
          "latitude": 26.5,
          "longitude": 123.4,
          "radius": 223070
        },
        "point2": {
          "latitude": 17.9,
          "longitude": 130.5,
          "radius": 59615
        },
        "point20": {
          "latitude": 27.0,
          "longitude": 122.6,
          "radius": 232685
        },
        "point21": {
          "latitude": 27.5,
          "longitude": 122.0,
          "radius": 242300
        },
        "point22": {
          "latitude": 28.3,
          "longitude": 121.4,
          "radius": 251915
        },
        "point23": {
          "latitude": 28.9,
          "longitude": 120.8,
          "radius": 261530
        },
        "point24": {
          "latitude": 33.0,
          "longitude": 120.5,
          "radius": 271145
        },
        "point25": {
          "latitude": 36.9,
          "longitude": 120.1,
          "radius": 280760
        },
        "point26": {
          "latitude": 38.0,
          "longitude": 119.7,
          "radius": 290375
        },
        "point27": {
          "latitude": 38.3,
          "longitude": 119.4,
          "radius": 299990
        },
        "point3": {
          "latitude": 18.5,
          "longitude": 130.2,
          "radius": 69230
        },
        "point4": {
          "latitude": 19.0,
          "longitude": 129.7,
          "radius": 78845
        },
        "point5": {
          "latitude": 19.0,
          "longitude": 129.4,
          "radius": 88460
        },
        "point6": {
          "latitude": 18.6,
          "longitude": 129.2,
          "radius": 98075
        },
        "point7": {
          "latitude": 18.9,
          "longitude": 129.0,
          "radius": 107690
        },
        "point8": {
          "latitude": 19.2,
          "longitude": 128.9,
          "radius": 117305
        },
        "point9": {
          "latitude": 19.6,
          "longitude": 128.4,
          "radius": 126920
        }
      }
    },
    "info": {
      "code": "1909",
      "en": "LEKIMA",
      "links": "https://rdc28.cwb.gov.tw/TDB/public/typhoon_detail?typhoon_id=201909",
      "year": 2019,
      "zh": "\u5229\u5947\u99ac"
    }
  }
}

$('#loadingWord').css('opacity', '1');
$('#loadingWord').css('margin-top', '40vh');

// Document Ready
$(function() {

  dashboard = new DashboardComponent();
  dashboard.init(get);

});
