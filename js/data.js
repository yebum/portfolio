/* Portfolio content — edit freely. */
window.PORTFOLIO = {
  "projects": [
    {
      "id": "MATMI",
      "title": "MATMI",
      "fullTitle": "MATMI",
      "context": "2026 Global Start-up Design Thinking Hackathon · Team 13 Hexagon",
      "year": "2026",
      "discipline": "ux",
      "awards": [
        "Grand Award"
      ],
      "cover": "MATMI",
      "lead": "MATMI는 낯선 음식의 이름을 번역해도 맛과 식감, 재료, 문화적 맥락까지 알기는 어렵다는 문제에서 출발한 푸드 경험 서비스이다. 메뉴에 카메라를 비추면 음식을 인식하고 3D 모습과 맛·식감·재료 정보, 개인 취향과의 적합도를 보여주어 주문 전 선택을 돕는다.",
      "caseStudy": {
        "problem": {
          "summary": "메뉴 이름은 번역되어도 음식의 경험은 전달되지 않는다",
          "body": [
            "글로벌 해커톤 첫날, 서로 다른 국가에서 온 팀원에게 김밥을 설명하며 음식 이름과 재료를 번역하는 것만으로는 실제 맛과 식감을 전하기 어렵다는 점을 발견했다. 여행자도 현지 메뉴를 번역한 뒤 이미지와 리뷰를 다시 검색하고 비교해야 음식을 고를 수 있다.",
            "MATMI는 낯선 현지 음식에 관심이 있는 독립 여행자와 유학생이 별도의 검색 없이 음식의 모습과 특징을 이해하고, 자신의 취향에 맞는지 판단할 수 있도록 돕는 것을 목표로 했다."
          ]
        },
        "solution": {
          "summary": "메뉴 스캔에서 3D 푸드 렌즈와 개인화 정보까지 한 흐름으로",
          "body": [
            "4일간의 해커톤에서 다섯 가지 음식(Tteokbokki, Phở, Pad Thai, Nasi Goreng, Lángos)을 지원하는 모바일 웹 MVP를 기획·디자인·구현했다. 로그인 없이 메뉴를 스캔하면 OCR로 음식명을 찾고, 인식 결과를 선택해 3D 음식 모델과 맛·식감·재료·주의 정보를 확인할 수 있다.",
            "취향 프로필을 바탕으로 Taste Match 점수를 계산하고, Community Lens에서 문화권별 음식 경험을 공유하도록 설계했다. 기기와 환경에 따라 카메라 사용이 어려울 때는 사진 업로드 흐름을 제공했다."
          ],
          "points": [
            {
              "label": "메뉴 OCR",
              "body": "Tesseract.js로 카메라의 메뉴 텍스트를 읽고 표기를 정규화해 지원 음식 다섯 가지와 비교한다. OCR 작업을 겹치지 않게 실행하고 일시적인 인식 누락에도 결과를 잠시 유지한다."
            },
            {
              "label": "Food Lens · 3D 프리뷰",
              "body": "GLB 음식 모델을 회전·확대해 형태를 먼저 확인하고, 맛과 식감, 주요 재료와 주의 정보를 같은 화면에서 읽을 수 있게 했다."
            },
            {
              "label": "Taste Match",
              "body": "좋아하는 맛·재료와 피하고 싶은 요소를 취향 프로필로 받아 음식 특성과 비교하고, 프로필을 바꾸면 0–100점 적합도를 다시 계산한다."
            },
            {
              "label": "Community Lens · My MATMI",
              "body": "문화권별 음식 경험 리뷰를 Supabase에 저장·조회하고, 브라우저에 저장한 음식과 먹어본 음식, 작성한 리뷰 기록을 My MATMI에서 확인하도록 연결했다."
            },
            {
              "label": "MATMI Glass",
              "body": "Unity와 OpenXR·Meta XR로 음식 정보가 시야에 나타나는 HUD 프로토타입을 제작했다. Quest 3 기기 권한과 ADB 연결 제한으로 실기기 카메라 OCR은 검증하지 못했으며, Unity Editor의 웹캠 영상과 발표용 선택 모드로 확장 방향을 시연했다."
            }
          ]
        },
        "result": {
          "summary": "작동하는 웹 MVP 배포와 해커톤 Grand Award",
          "body": [
            "메뉴 촬영·음식 인식·3D 확인·Taste Match·Community Lens·개인 기록을 하나의 사용자 흐름으로 연결한 반응형 웹 MVP를 배포했다. 음식 데이터는 별도 catalog로 관리해 지원 음식과 3D 에셋을 추가할 수 있게 구성했다.",
            "웹 서비스와 별도의 Unity XR 데모로 모바일에서 웨어러블로 이어지는 경험을 제시했으며, 2026 Global Start-up Design Thinking Hackathon에서 Grand Award를 수상했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "글로벌 해커톤 · AI 푸드 경험 서비스"
        },
        {
          "k": "기간",
          "v": "4일 · 2026"
        },
        {
          "k": "역할",
          "v": "서비스 기획 · UX/UI · 웹 MVP 개발 · Unity XR 프로토타이핑"
        },
        {
          "k": "사용 기술",
          "v": "Expo Router · React · TypeScript · Tesseract.js · 3D Web · Supabase · Unity"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "youtube",
            "id": "F-NkzQlBaaY",
            "label": "2026 · MATMI · Video 01"
          }
        ],
        "decks": [
          {
            "src": "assets/pdf/MATMI-Team13-Hexagon.pdf",
            "label": "2026 · MATMI · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "MATMI",
            "label": "MATMI User Flow"
          },
          {
            "src": "MATMI-home",
            "label": "Home · Scan a menu"
          },
          {
            "src": "MATMI-scanner",
            "label": "Menu Scanner"
          },
          {
            "src": "MATMI-food-lens",
            "label": "Food Lens · Taste Match"
          },
          {
            "src": "MATMI-taste-profile",
            "label": "Taste Profile"
          }
        ],
        "links": [
          {
            "href": "https://try-matmi.vercel.app/",
            "label": "Live Prototype"
          },
          {
            "href": "https://github.com/yebum/matmi",
            "label": "GitHub Repository"
          }
        ]
      }
    },
    {
      "id": "TimeOfExtinction",
      "title": "소멸의시간",
      "fullTitle": "잠비나이 — 소멸의시간",
      "context": "KALEIDOSCOPE : 만화경",
      "year": "2026",
      "discipline": "media",
      "awards": [],
      "cover": "TimeOfExtinction",
      "lead": "잠비나이의 공연 〈소멸의시간〉을 위해 제작한 오디오비주얼 프로젝트이다. 공연 음악의 밀도와 감정의 흐름을 시각적 움직임으로 확장하고, 무대 위의 사운드와 이미지가 하나의 장면처럼 느껴지도록 구성하였다.",
      "caseStudy": {
        "problem": {
          "summary": "음악의 밀도와 감정을 대형 LED 무대에서 읽히게 하기",
          "body": [
            "잠비나이의 공연 〈소멸의시간〉은 강한 에너지와 긴장, 사라지고 다시 생성되는 감정의 흐름을 가진 음악이다. 이 밀도와 감정을 시각적 움직임으로 확장하되, 사운드와 이미지가 서로 독립된 요소가 아니라 하나의 장면으로 느껴지게 하는 것이 과제였다.",
            "동시에 어두운 무대와 대형 LED 스크린, 무대와 관객 사이의 거리라는 실제 공연 환경에서도 형태가 선명하게 읽히고 시각적 에너지가 유지되어야 했다."
          ]
        },
        "solution": {
          "summary": "TouchDesigner로 만든 잉크 스톰 실시간 비주얼",
          "body": [
            "고정된 이미지를 보여주는 대신 잉크가 퍼지고 서로 충돌하며 형태를 바꾸는 추상적 풍경을 택해, 음악이 공간 안에서 번져 나가는 듯한 감각을 만들었다. 어두운 무대 위에서 청록과 백색의 흐름이 강하게 대비되도록 구성해 공연의 몰입도를 높였다.",
            "TouchDesigner의 노드 기반 네트워크에서 잉크가 번지고 폭발하는 듯한 유기적 이미지를 만들고, 장면의 밀도와 색 변화를 음악의 흐름에 맞춰 사용할 수 있도록 제작했다. 오디오비주얼 기획, 제작, 공연 송출을 맡았으며 TouchDesigner와 MCP를 사용했다."
          ],
          "points": [
            {
              "label": "잉크 스톰 컨셉",
              "body": "잉크가 퍼지고 충돌하며 형태를 바꾸는 추상적 이미지로 음악의 확산과 소멸을 표현했다. 청록과 백색의 강한 대비로 어두운 무대에서도 흐름이 드러나게 했다."
            },
            {
              "label": "노드 네트워크 구성",
              "body": "audio_color_visual 네트워크를 중심으로 영상 소스, 컬러, 움직임, 합성 흐름을 노드 단위로 구성했다. 잉크 스톰처럼 번지는 텍스처와 강한 명암 대비를 조합했다."
            },
            {
              "label": "공연 환경 송출 점검",
              "body": "화면 비율과 밝기, 관객 시야에서 비주얼이 차지하는 밀도를 고려해 송출 이미지를 점검했다. 무대와 관객 사이의 거리에서도 시각적 에너지가 유지되도록 조정했다."
            }
          ]
        },
        "result": {
          "summary": "잠비나이 공연 현장 LED 스크린 상영",
          "body": [
            "잠비나이의 〈소멸의시간〉 공연에서 사용할 오디오비주얼 콘텐츠를 완성하고, 실제 공연 현장의 LED 스크린에 상영했다. 추상적인 잉크와 폭풍의 이미지로 음악의 감정적 강도와 무대의 분위기를 시각화했다.",
            "TouchDesigner 기반 실시간 미디어아트 제작부터 공연 환경에 맞춘 화면 구성과 송출까지 전 과정을 경험했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "공연 오디오비주얼"
        },
        {
          "k": "사용 도구",
          "v": "TouchDesigner · MCP"
        },
        {
          "k": "역할",
          "v": "오디오비주얼 기획 · 제작 · 공연 송출"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "youtube",
            "id": "Yiv7aBwdAU4",
            "label": "2026 · 잠비나이 — 소멸의시간 · Video 01"
          }
        ],
        "decks": [],
        "images": [
          {
            "src": "TimeOfExtinction",
            "label": "Live Performance"
          },
          {
            "src": "TimeOfExtinction-TouchDesigner",
            "label": "TouchDesigner Network"
          }
        ],
        "links": []
      }
    },
    {
      "id": "SilgamSujevi",
      "title": "실감수제비",
      "fullTitle": "실감수제비",
      "context": "2026 SUMMER WEEK AI+XR 공모전",
      "year": "2026",
      "discipline": "xr",
      "awards": [],
      "cover": "SilgamSujevi",
      "lead": "실감수제비는 제주 바닷가에서 가족과 함께했던 물수제비의 기억을 MediaPipe 동작 인식과 실시간 3D 환경으로 재현한 Unity 6 기반의 체험형 게임이다. 사용자는 카메라 앞에서 양팔을 T자로 벌려 준비한 뒤 한쪽 팔을 옆으로 크게 스윙하며 직접 물수제비를 던진다.",
      "caseStudy": {
        "problem": {
          "summary": "화면으로 보는 기억을 몸으로 다시 경험하기",
          "body": [
            "어릴 때 제주 바닷가에서 가족과 함께 돌을 고르고 물수제비를 던지던 기억을, 관객이 화면으로 바라보는 콘텐츠가 아니라 직접 몸을 움직여 다시 경험하는 놀이로 만들고자 했다. 이를 위해 실제 팔 동작이 게임 속 투척으로 자연스럽게 이어져야 했고, 누구나 짧은 시간 안에 이해하고 참여할 수 있을 만큼 체험이 단순해야 했다."
          ]
        },
        "solution": {
          "summary": "MediaPipe 동작 인식 기반 Unity 6 물수제비 게임",
          "body": [
            "사용자는 카메라 앞에서 양팔을 T자로 벌려 준비한 뒤 한쪽 팔을 옆으로 크게 스윙해 직접 물수제비를 던진다. 물수제비라는 단순한 행위에 캐릭터, 바다, 물보라, 점수와 재도전의 흐름을 더해 실감형 체험으로 구성했다.",
            "Unity 6에서 제주 바닷가 환경과 물 셰이더, 물수제비 돌, 장식 오브젝트를 하나의 플레이 공간으로 구성했다. 주인공 캐릭터 에셋은 Varco 3D로, 배경음악은 Suno AI로 제작했고, 게임의 입력·상태·물리·점수 시스템은 Codex를 활용해 개발했다. 기획, 캐릭터 에셋 제작, 게임 개발을 맡았으며 Unity 6, MediaPipe, OpenCV, Varco 3D, Suno AI, Codex를 사용했다."
          ],
          "points": [
            {
              "label": "MediaPipe 포즈 브리지",
              "body": "Python 기반 MediaPipe 포즈 브리지에서 어깨·팔꿈치·손목의 위치를 추적하고, T자 준비 자세와 옆 방향 스윙을 판정해 localhost UDP로 Unity에 전달한다."
            },
            {
              "label": "캐릭터·발사 입력",
              "body": "수신된 동작 정보를 캐릭터 팔 리깅과 돌 발사 입력에 연결했다. 준비 자세와 스윙 동작을 분리해 의도하지 않은 발사를 줄였다."
            },
            {
              "label": "바운스 물리",
              "body": "돌의 속도, 물 진입 각도, 공격 각도, 회전량, 수면 충돌 시 양력을 계산해 바운스를 결정한다. 물리 조건에 따라 매번 다른 물수제비 결과가 나온다."
            },
            {
              "label": "게임 상태·리더보드",
              "body": "게임 시작·플레이·결과·재도전 상태와 로컬 TOP 10 리더보드를 개발했다."
            },
            {
              "label": "사운드 디자인",
              "body": "Suno AI로 제작한 배경음악에 바다 ambience와 투척·물보라·성공 효과음을 결합해 몰입감을 높였다."
            }
          ]
        },
        "result": {
          "summary": "카메라 기반 인터랙티브 게임 프로토타입 완성",
          "body": [
            "사용자의 실제 팔 동작에 캐릭터가 반응하고, 돌이 물 위를 튕기며, 결과가 점수와 리더보드로 이어지는 카메라 기반 인터랙티브 게임 프로토타입을 완성했다.",
            "이 과정에서 생성형 3D 에셋과 AI 음악을 Unity 게임 개발 및 컴퓨터 비전 입력과 결합하는 제작 과정을 경험했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "AI+XR 체험형 게임"
        },
        {
          "k": "사용 도구",
          "v": "Unity 6 · MediaPipe · OpenCV · Varco 3D · Suno AI · Codex"
        },
        {
          "k": "역할",
          "v": "기획 · 캐릭터 에셋 제작 · 게임 개발"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "youtube",
            "id": "BgE90X3G_rA",
            "label": "2026 · 실감수제비 · Video 01"
          }
        ],
        "decks": [],
        "images": [
          {
            "src": "SilgamSujevi",
            "label": "Gameplay Thumbnail"
          }
        ],
        "links": [
          {
            "href": "https://github.com/yebum/JejuStoneSkippingXR",
            "label": "GitHub Repository"
          }
        ]
      }
    },
    {
      "id": "GetTheOceanSummerReady",
      "title": "GET THE OCEAN SUMMER READY",
      "fullTitle": "Get The Ocean Summer Ready",
      "context": "부산국제마케팅광고제 YOUNG STARS 경진대회",
      "year": "2026",
      "discipline": "motion",
      "awards": [],
      "cover": "GetTheOceanSummerReady",
      "lead": "GET THE OCEAN SUMMER READY는 매년 여름을 준비하는 사람들의 익숙한 행동을 바탕으로, 바다도 우리를 맞이할 준비가 필요하다는 질문을 던지는 캠페인이다. 운동과 산책을 해양 보호를 위한 일상의 행동으로 연결해, 거대하고 멀게 느껴지는 환경 문제를 누구나 반복할 수 있는 움직임으로 바꾸고자 하였다.",
      "caseStudy": {
        "problem": {
          "summary": "여름을 준비하는 사람들, 준비되지 않은 바다",
          "body": [
            "사람들은 여름과 바다를 위해 몇 달 동안 몸을 준비하지만, 바다가 우리를 맞이할 준비가 되었는지는 자주 묻지 않는다. 해양 환경 문제는 거대하고 멀게 느껴져 누구나 반복할 수 있는 일상의 행동으로 이어지기 어렵다.",
            "또한 개인의 참여를 모두 환경 효과로 환산하면 캠페인의 신뢰성이 흔들리기 때문에, 상징적인 참여와 실제 환경 효과를 구분해 보여주는 것도 과제였다."
          ]
        },
        "solution": {
          "summary": "운동을 걷기로 바꾸는 캠페인 WALKOUT",
          "body": [
            "익숙한 여름 준비의 방향을 바꾸어, 우리가 걷는 시간이 바다를 준비하는 시간이 될 수 있다는 발상에서 WORK OUT을 WALK OUT으로 전환했다. 캠페인의 핵심 행동은 짧은 자동차 이동을 걷기로 바꾸는 WALKOUT으로, 특별한 장비나 전문 지식 없이 누구나 반복할 수 있는 환경 행동이다.",
            "참가자는 돕고 싶은 해변을 선택하고, 자신의 걷기 거리를 그 해변의 공동 목표에 더한다. 개인의 산책이 해변 단위의 집단 목표로 모이도록 참여 구조를 설계했다. 캠페인 기획, 크리에이티브 전략, 보드 제작을 맡았다."
          ],
          "points": [
            {
              "label": "Summer Distance",
              "body": "각 해변의 이전 공식 연간 방문객 수를 목표 거리로 설정했다. “1 visitor = 1 kilometer for the ocean” 규칙에 따라 방문객 한 명을 바다를 위한 1km의 상징적 목표로 환산했다."
            },
            {
              "label": "보도 마커·QR 참여",
              "body": "참가자는 QR 코드가 있는 보도 마커나 캠페인 페이지를 통해 WALKOUT을 시작하고, 걷기 거리와 연속 기록을 쌓는다."
            },
            {
              "label": "대체 거리만 계산",
              "body": "모든 걸음에 환경 효과를 곱하지 않고, 자동차나 택시 이동을 실제로 대체했다고 확인한 거리에만 타이어 마모 감소 추정치를 적용했다."
            },
            {
              "label": "SUMMER READY 게이지",
              "body": "해변별 실시간 게이지와 누적 거리, 참여자 수로 진행을 시각화하고, 목표가 100%에 도달하면 해당 해변이 SUMMER READY가 된다. 이는 해변이 과학적으로 완전히 깨끗해졌다는 주장이 아니라 상징적 행동 목표의 달성을 뜻한다."
            }
          ]
        },
        "result": {
          "summary": "보드와 영상으로 제시한 WALKOUT 캠페인",
          "body": [
            "부산국제마케팅광고제 YOUNG STARS 경진대회를 위해 캠페인 보드와 영상을 제작했다. 보드와 영상에서는 보도 위 거리 마커, QR 코드, 공유 목표, 해변별 진행률을 통해 작은 이동이 함께 만드는 집단적 변화를 보여주었다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "광고 캠페인 기획"
        },
        {
          "k": "참가 대회",
          "v": "부산국제마케팅광고제 YOUNG STARS"
        },
        {
          "k": "역할",
          "v": "캠페인 기획 · 크리에이티브 전략 · 보드 제작"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "youtube",
            "id": "wltwVsVlePI",
            "label": "2026 · Get The Ocean Summer Ready · Video 01"
          }
        ],
        "decks": [],
        "images": [
          {
            "src": "YoungStars",
            "label": "참가 증명서"
          },
          {
            "src": "GetTheOceanSummerReady",
            "label": "Presentation Board"
          }
        ],
        "links": []
      }
    },
    {
      "id": "BioAx",
      "title": "연결",
      "fullTitle": "연결",
      "context": "제주 바이오 AX 해커톤",
      "year": "2026",
      "discipline": "ux",
      "awards": [
        "제주 바이오 AX 해커톤 우수상"
      ],
      "cover": "BioAx",
      "lead": "연결은 제주에서 특별한 로컬 경험을 찾는 관광객을 위해, 흩어져 있는 바이오 관련 장소와 체험을 하나의 여행 코스로 이어주는 관광 서비스이다. 감귤, 동백, 용암해수, 발효식품처럼 이미 제주 여행 속에 존재하는 바이오 자원을 하나의 테마로 묶고, 관광객의 위치와 시간, 관심사에 따라 개인화된 코스를 추천하도록 설계하였다.",
      "metrics": {
        "title": "데이터 분석 · 모델 성능",
        "source": "발표 자료 p.3, p.10 · 비짓제주 콘텐츠·제주 관광지·인증기업 공공데이터",
        "groups": [
          {
            "kind": "stats",
            "label": "공공데이터 분석",
            "sample": "문제 정의의 근거",
            "items": [
              {
                "value": "73%",
                "label": "인기 관광지 상위 30곳 중 반경 3km 안에 바이오 POI가 있는 비율"
              },
              {
                "value": "52.5배",
                "label": "인기 상위 50개 관광지 대비 낮은 바이오 POI 조회수(중앙값)"
              },
              {
                "value": "3.4%",
                "label": "2016–2025 비짓제주 신규 콘텐츠 중 바이오 관련 평균 비중"
              }
            ]
          },
          {
            "kind": "stats",
            "label": "AI 코스 추천 모델",
            "sample": "CatBoost Regressor · Random Search · K-Fold 교차검증(k=10)",
            "items": [
              {
                "value": "0.3745",
                "label": "Recall@10 — 추천 POI Top-10 기준"
              }
            ]
          }
        ]
      },
      "caseStudy": {
        "problem": {
          "summary": "흩어져 있어 여행 경험이 되지 못하는 제주 바이오",
          "body": [
            "제주에는 감귤, 동백, 용암해수, 발효식품 같은 바이오 자원이 많지만 관광객은 이를 여행의 경험으로 인식하지 못한다. 공공데이터 분석 결과 바이오 관련 장소의 관광 주목도는 인기 관광지보다 낮았지만, 인기 관광지의 73% 주변에는 이미 바이오 관련 POI가 존재했다.",
            "문제는 경험이 없는 것이 아니라, 감귤밭·해녀 문화·동백·발효식품 같은 경험이 농업·먹거리·자연 체험으로 흩어져 하나의 바이오 경험으로 연결되지 않는 데 있었다. 그 결과 관광객은 바이오 장소를 직접 찾기 어렵고, 기업과 제주도는 바이오 경험이 방문과 구매로 이어지는지 확인하기 어려웠다."
          ]
        },
        "solution": {
          "summary": "흩어진 바이오 장소를 잇는 개인화 여행 코스 서비스",
          "body": [
            "관광객, 바이오 기업, 제주도 세 주체의 문제를 함께 해결하는 관광 서비스 '연결'을 설계했다. 흩어진 경험을 하나의 여행으로 묶고, 그 여행의 결과를 소비와 산업 데이터로 다시 연결하는 것이 핵심이다. ‘바이오’라는 낯선 산업 용어가 부담이 되지 않도록, 산업 정보를 전면에 노출하기보다 코스를 선택하고, 이동하고, 기록하고, 혜택을 받는 흐름 안에서 바이오 스토리를 자연스럽게 접하도록 UI/UX를 구성했다.",
            "기반 데이터는 제주 POI 공공데이터, VisitJeju 관광정보, 제주 용암해수 산업단지 데이터로 구축했다. 장소와 좌표를 정규화하고 바이오 테마와 스토리 요소를 추출한 뒤, 직접 검증한 현장 정보로 보완해 코스 데이터로 재구성했다. 여행자 페르소나 데이터와 POI 특성을 바탕으로 CatBoost Regressor로 사용자별 예상 만족도를 예측하고, 추천 POI를 드로잉 코스·미션·바우처로 잇는 구조를 설계했다.",
            "UI/UX 디자인, 사용자 흐름 설계, 발표자료 제작을 담당했으며 HTML, CSS, JS, Figma, Python을 사용했다."
          ],
          "points": [
            {
              "label": "AI 바이오 코스 추천",
              "body": "사용자의 위치, 체류시간, 관심사를 입력받아 AI가 적합한 바이오 POI를 추천하고, 추천된 장소들을 완주 가능한 하나의 코스로 제시한다."
            },
            {
              "label": "드로잉 코스",
              "body": "이동 경로가 감귤이나 바이오 원료의 형태를 그리도록 해, 단순한 장소 방문을 기록하고 공유할 수 있는 여행 결과물로 바꾼다. 각 지점에는 짧은 스토리 미션을 배치했다."
            },
            {
              "label": "단계형 바우처",
              "body": "방문 수가 늘어날수록 제품과 체험 혜택이 확장되도록 해 실제 소비 전환까지 이어지게 했다."
            },
            {
              "label": "운영 대시보드",
              "body": "코스 선택, POI 방문, 완주, 쿠폰 사용 데이터를 기업과 운영자가 확인할 수 있는 대시보드 구조를 제안했다."
            }
          ]
        },
        "result": {
          "summary": "모바일 서비스 MVP 완성, 해커톤 우수상",
          "body": [
            "홈, 여행 조건 입력, AI 코스 추천, 지도 기반 투어, 드로잉 코스와 바우처로 이어지는 모바일 서비스 MVP를 완성했다. 제주 바이오 AX 해커톤에서 우수상을 받았다.",
            "공공데이터에서 발견한 문제를 사용자 경험과 서비스 구조로 전환하고, 사용자의 행동을 기업과 지역이 활용할 수 있는 데이터로 연결하는 다면적 서비스 설계 과정을 경험했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "해커톤"
        },
        {
          "k": "사용 툴",
          "v": "HTML, CSS, JS, Figma, Python"
        },
        {
          "k": "역할",
          "v": "프로젝트 기획 및 프론트엔드 디자인"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "youtube",
            "id": "wP5sIceJL0Q",
            "label": "2026 · 연결 · Video 01"
          }
        ],
        "decks": [
          {
            "id": "1lGwf16m7RxHmH7VpNh3JtwxCkvsnhoiz",
            "label": "2026 · 연결 · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "BioAx",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "Neuroscape",
      "title": "Neuroscape",
      "fullTitle": "Neuroscape",
      "context": "2026 BCM Academy AI X Media Startup Project",
      "year": "2026",
      "discipline": "media",
      "awards": [
        "MAD STARS Gold Prize",
        "BCM Academy 창의상"
      ],
      "cover": "Neuroscape",
      "lead": "Neuroscape는 교사의 짧은 공강과 휴식 시간을 실제 회복 경험으로 전환하기 위해 개발한 EEG 기반 VR 명상 콘텐츠이다. 사용자가 VR 기기를 착용하면 외부의 시각·청각 자극에서 잠시 분리되고, 실시간으로 측정된 뇌파 변화가 미디어아트의 움직임과 형태에 반영되어 개인마다 다른 몰입 환경을 경험할 수 있도록 설계하였다.",
      "metrics": {
        "title": "검증 결과",
        "source": "발표 자료 p.9 · 교사·교육기관 담당자 대상 PCF 검증",
        "groups": [
          {
            "kind": "stats",
            "label": "검증 대상과 문제 강도",
            "sample": "PCF(문제–고객 적합성) 검증",
            "items": [
              {
                "value": "20명+",
                "label": "교사"
              },
              {
                "value": "5명+",
                "label": "교육기관 담당자"
              },
              {
                "value": "7.6",
                "unit": "/10",
                "label": "Pain Score — 직무 스트레스와 회복 필요도"
              }
            ]
          },
          {
            "kind": "bars",
            "label": "응답 비율",
            "sample": "자료 기준",
            "items": [
              {
                "label": "문제 공감",
                "sub": "직장 내 회복 공간 부족에 공감",
                "value": 87
              },
              {
                "label": "지불 가능성",
                "sub": "담당자의 예산 또는 도입 가능성 응답",
                "value": 79
              },
              {
                "label": "Early Adopter",
                "sub": "초기 체험·실증 참여 의향",
                "value": 54.5
              }
            ]
          }
        ]
      },
      "caseStudy": {
        "problem": {
          "summary": "쉬는 시간은 있어도 회복할 환경이 없는 교사",
          "body": [
            "교사에게는 쉬는 시간이 있어도 실제로 긴장을 내려놓을 수 있는 환경이 부족하다. 수업과 생활지도 이후에도 행정업무, 학부모 연락, 동료의 시선과 교무실의 소음이 이어져, 물리적으로 앉아 있는 시간과 심리적으로 회복하는 시간 사이에 차이가 생긴다.",
            "기존 대안에도 한계가 있었다. 휴게실이나 안마의자는 업무 환경과 완전히 분리되기 어렵고, 명상 앱은 스마트폰 알림과 다른 콘텐츠의 방해를 받기 쉬우며, 전문 상담은 일상적으로 이용하기에 시간과 진입 부담이 크다."
          ]
        },
        "solution": {
          "summary": "뇌파에 반응하는 약 10분 VR 명상 콘텐츠",
          "body": [
            "회복에 필요한 것은 더 오래 쉬는 것이 아니라, 짧은 시간이라도 업무 환경과 심리적으로 분리되는 경험이라고 정의했다. VR로 외부의 시각·청각 자극을 차단하고, 실시간으로 측정한 EEG 변화가 미디어아트의 움직임과 형태에 반영되도록 해 정해진 명상 영상이 아닌 사용자 상태에 반응하는 콘텐츠를 만들었다.",
            "EEG 수치를 점수화해 평가하거나 그대로 노출하는 대신 입자와 빛, 색, 오브젝트의 움직임으로 변환했다. 사용자는 자신의 상태를 분석하거나 판단해야 하는 부담 없이 변화하는 풍경을 바라보는 과정에 몰입한다.",
            "서비스 기획, 사용자 경험 설계, VR 콘텐츠 구조 기획을 중심으로 참여했으며 TouchDesigner, Blender, GaussianSplatting, Claude를 사용했다."
          ],
          "points": [
            {
              "label": "10분 세션 흐름",
              "body": "공강과 점심시간에도 이용할 수 있는 약 10분 세션이 현실적이라고 판단했다. VR 착용, 상태 확인, 개인 기준선 측정, 몰입 체험, 결과 확인으로 이어지는 사용자 흐름을 설계했다."
            },
            {
              "label": "EEG 반응형 미디어아트",
              "body": "초기 상태를 기준선으로 설정한 뒤, EEG 신호의 진폭과 상태 변화에 따라 TouchDesigner 기반의 명상 유도 오브젝트가 확산되거나 변화하도록 했다."
            },
            {
              "label": "고정 시점 VR 공간",
              "body": "시점 이동을 최소화하고 고정된 공간 안에서 자연스럽게 변화하는 풍경을 중심으로 구성해, 짧은 시간에도 안정적으로 경험할 수 있게 했다."
            },
            {
              "label": "B2G 도입 구조",
              "body": "교사와 교육기관 관계자를 대상으로 문제 상황과 이용 의향을 확인했다. 교사 개인이 사용하지만 기관이 비용을 지불하는 B2G 구조를 함께 설계했다."
            }
          ]
        },
        "result": {
          "summary": "EEG·VR 회복 콘텐츠 MVP, MAD STARS Gold Prize",
          "body": [
            "EEG 신호와 VR 미디어아트를 연결해 사용자 상태 변화에 실시간으로 반응하는 10분 내외의 몰입형 회복 콘텐츠 MVP를 구현했다. 교사 20명 이상과 교육기관 담당자 5명 이상을 대상으로 한 검증에서 직무 스트레스와 회복 필요도(Pain Score)는 10점 기준 7.6이었고, 자료 기준 직장 내 회복 공간 부족에 대한 문제 공감은 87%, 담당자의 예산 또는 도입 가능성 응답은 79%, 초기 체험 및 실증 참여 의향은 54.5%로 나타났다. 부산국제마케팅광고제 MAD STARS Gold Prize와 2026 BCM Academy AI X Media Startup Project 창의상을 받았다.",
            "기술의 완성도보다 사용자가 어떤 상황에서 이 경험을 필요로 하는지 먼저 이해해야 한다는 점을 배웠다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "스타트업 경진대회"
        },
        {
          "k": "사용 툴",
          "v": "TouchDesigner, Blender, GaussianSplatting, Claude"
        },
        {
          "k": "역할",
          "v": "프로젝트 기획 및 인터랙티브 콘텐츠 개발"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "10iDYKqnyNNyr8Pj9hRNzn7H0ivoslYeT",
            "label": "2026 · Neuroscape · Video 01"
          }
        ],
        "decks": [
          {
            "id": "14aEgKFRFp5sHhzpV5MRiNV2jdBPXoddr",
            "label": "2026 · Neuroscape · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "Neuroscape",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "BeyondTheCenter",
      "title": "Beyond The Center",
      "fullTitle": "Beyond The Center",
      "context": "제 2회 이머시브 전시회",
      "year": "2026",
      "discipline": "media",
      "awards": [],
      "cover": "BeyondTheCenter",
      "lead": "Beyond the Center는 포스트휴머니즘을 바탕으로 인간과 AI가 서로 연결되며 새로운 생태계를 형성하는 과정을 표현한 이머시브 미디어아트 프로젝트이다. 인간의 일상에서 발생하는 작은 행동 데이터를 하나의 ‘점’으로 시작해, 점들이 연결되어 시냅스와 도시의 네트워크를 이루고 다시 우주적 구조로 확장되는 과정을 3면 프로젝션 공간 안에 구현하였다.",
      "caseStudy": {
        "problem": {
          "summary": "도구를 넘어 삶에 스며든 AI, 그 관계를 어떻게 보여줄까",
          "body": [
            "AI는 더 이상 필요할 때만 쓰는 외부 도구가 아니라 인간의 사고와 행동, 사회 시스템 전반에 깊게 연결되어 있다. 기술을 인간과 대립하는 존재로 보는 대신, 둘의 경계가 흐려지는 포스트휴머니즘의 관점에서 미래의 관계를 바라보고자 했다.",
            "과제는 이 추상적인 철학 개념을 관객이 3면 프로젝션 공간 안에서 직관적으로 경험하도록 서사와 시각 언어로 옮기는 것이었다."
          ]
        },
        "solution": {
          "summary": "점에서 우주로 확장되고 되돌아오는 4단계 이머시브 영상",
          "body": [
            "인간의 일상적 행동을 데이터의 최소 단위인 ‘점’으로 설정했다. 메시지, 검색, 결제 같은 작은 행동이 서로 연결되어 시냅스를 이루고, 도시의 교통과 인프라, 우주의 별자리와 궤도로 확장된 뒤 다시 하나의 점으로 돌아온다. 같은 ‘연결’ 구조를 개인–도시–우주로 반복 확장해, 기술 발전을 직선적 진보가 아닌 지속적인 순환으로 표현했다.",
            "전시 기획과 스토리 구조 설계부터 이머시브 영상 제작, TouchDesigner 기반 시각 구현까지 참여했다. TouchDesigner로 점과 선의 데이터 네트워크를 구현하고, AI로 생성한 시냅스·도시·우주 이미지를 영상 소스로 활용했다. 블랍 트래킹과 영상 합성으로 장면들이 하나의 연결 구조로 이어지게 했고, 3면 프로젝션 환경에 맞춰 화면의 확장 방향과 오브젝트 이동을 설계해 관객이 데이터 구조 내부에 들어온 듯한 공간감을 느끼도록 했다. 사용 툴은 TouchDesigner, MadMapper다."
          ],
          "points": [
            {
              "label": "LOG",
              "body": "검은 공간에 인간의 행동 데이터를 상징하는 점과 텍스트가 생성되며 작품이 시작된다."
            },
            {
              "label": "WEAVE",
              "body": "분리되어 있던 데이터가 서로 연결되어 네트워크를 이루고, 시냅스와 도시의 데이터망으로 스케일이 커진다."
            },
            {
              "label": "COSMOS",
              "body": "연결 구조가 별자리와 궤도로 확장되어, 작은 데이터에서 출발한 흐름이 거대한 네트워크 생태계에 이른다."
            },
            {
              "label": "LOOP",
              "body": "확장된 네트워크가 다시 하나의 점으로 돌아가 처음과 끝을 잇는다. 약 1분 35초 영상을 반복 상영해도 자연스럽게 이어지도록 구성했다."
            }
          ]
        },
        "result": {
          "summary": "3면 프로젝션 이머시브 콘텐츠로 완성",
          "body": [
            "인간의 작은 행동 데이터가 연결과 확장을 거쳐 새로운 생태계를 형성하는 과정을 제 2회 이머시브 전시회를 위한 3면 프로젝션 기반 이머시브 콘텐츠로 완성했다. 점–네트워크–시냅스–도시–우주로 이어지는 스케일과 처음으로 되돌아오는 루프 구조로 포스트휴머니즘의 순환적 관계를 공간 안에 구현했다.",
            "철학적 개념을 서사 구조와 시각적 메타포, 공간 연출로 전환하고, TouchDesigner와 AI 기반 영상 제작 방식을 이머시브 환경에 결합하는 과정을 경험했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "전시 프로젝트"
        },
        {
          "k": "사용 툴",
          "v": "TouchDesigner, MadMapper"
        },
        {
          "k": "역할",
          "v": "프로젝션 매핑 및 미디어아트 제작"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "1yHndB4FKu6hsApJGYCYPQrEgVt-p1Rh-",
            "label": "2026 · Beyond The Center · Video 01"
          }
        ],
        "decks": [
          {
            "id": "1cjBZXPzT4YzQaqhe9ZykZBE1D7h4b_Ie",
            "label": "2026 · Beyond The Center · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "BeyondTheCenter",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "XrStudio",
      "title": "파국의 궤도",
      "fullTitle": "파국의 궤도",
      "context": "XR스튜디오 쇼케이스",
      "year": "2026",
      "discipline": "media",
      "awards": [],
      "cover": "XrStudio",
      "lead": "파국의 궤도는 단테의 『신곡』 중 애욕, 폭력, 배신의 지옥을 현대적으로 재해석한 미디어아트 작품이다. 세 개의 지옥을 관계가 무너지는 과정으로 연결하여, 욕망에서 시작된 감정이 폭력과 배신으로 이어지며 결국 파국에 이르는 흐름을 시각적으로 표현하였다.",
      "caseStudy": {
        "problem": {
          "summary": "『신곡』의 세 지옥을 하나의 관계 붕괴로 읽을 수 있을까",
          "body": [
            "단테의 『신곡』은 죄의 종류에 따라 지옥을 구분한다. 이 작품은 서로 분리된 애욕, 폭력, 배신의 지옥을 단순히 나열하지 않고, 욕망에서 시작된 감정이 폭력과 배신을 거쳐 파국에 이르는 하나의 관계 붕괴 과정으로 재해석할 수 있는지에서 출발했다.",
            "동시에 원작을 자세히 모르는 관객도 색과 움직임, 분위기의 변화만으로 관계가 무너지는 흐름을 직관적으로 느낄 수 있어야 했다."
          ]
        },
        "solution": {
          "summary": "긴장이 고조되는 3막 실시간 그래픽과 붉은 눈의 순환 구조",
          "body": [
            "작품의 전체 콘셉트와 시각 연출을 기획하고, TouchDesigner로 실시간 그래픽 기반 미디어아트 영상을 제작했다. 관계 속 욕망과 집착을 애욕의 지옥으로, 통제되지 않은 감정이 타인을 해치는 순간을 폭력의 지옥으로, 신뢰가 완전히 무너지는 마지막 단계를 배신의 지옥으로 연결했다.",
            "세 구간이 독립된 장면으로 보이지 않도록 감정적 강도와 시각적 흐름을 단계적으로 설계했다. 오브젝트의 움직임과 형태 변화, 색과 속도를 조절해 각 지옥의 감정을 구현하고, 애욕에서 배신으로 갈수록 시각적 긴장감이 고조되도록 이었다. 사용 툴은 TouchDesigner, Suno다."
          ],
          "points": [
            {
              "label": "애욕의 지옥",
              "body": "끌림과 집착이 반복되는 움직임을 중심으로 관계 속 욕망을 표현했다."
            },
            {
              "label": "폭력의 지옥",
              "body": "더 빠르고 거친 움직임과 강한 시각적 충돌로 감정의 폭발을 강조했다."
            },
            {
              "label": "배신의 지옥",
              "body": "관계가 완전히 단절되고 붕괴되는 인상을 중심으로 전체 흐름을 마무리했다."
            },
            {
              "label": "붉은 눈",
              "body": "처음과 끝에 같은 붉은 눈을 배치해 서사를 순환 구조로 묶었다. 인간의 선택을 지켜보는 시선이자, 지옥이 스스로의 선택이 만든 결과임을 암시하는 상징이다."
            }
          ]
        },
        "result": {
          "summary": "관계의 파국을 그린 실시간 미디어아트 완성",
          "body": [
            "XR스튜디오 쇼케이스를 위해 애욕, 폭력, 배신의 지옥을 관계가 파국에 이르는 하나의 과정으로 재구성한 미디어아트 작품을 완성했다. 세 장면의 긴장이 점차 강해지도록 연출하고, 붉은 눈으로 인간의 선택과 그 결과를 연결했다.",
            "고전 문학의 핵심 개념을 현대적인 관계의 서사로 전환하고, 이를 생성형 비주얼과 실시간 그래픽으로 표현하는 방법을 탐구했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "전시 프로젝트"
        },
        {
          "k": "사용 툴",
          "v": "TouchDesigner, Suno"
        },
        {
          "k": "역할",
          "v": "미디어아트 기획 및 제작"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "1ZbmVpZwFRlPIEw2KhcgOynlWkr4F228a",
            "label": "2026 · 파국의 궤도 · Video 01"
          }
        ],
        "decks": [
          {
            "id": "1prjilM8YLbc1_YWmU75l4wwPsLqhfFHn",
            "label": "2026 · 파국의 궤도 · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "XrStudio",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "Invader",
      "title": "Invader",
      "fullTitle": "Invader",
      "context": "유니티 프로그래밍",
      "year": "2026",
      "discipline": "xr",
      "awards": [
        "학과 우수작 연합PT"
      ],
      "cover": "Invader",
      "lead": "Invader는 고전 슈팅 게임의 단순한 회피·발사 구조를 Unity의 컴포넌트, 충돌, 프리팹 생성과 상태 관리로 직접 구현해 보기 위해 기획한 3D 아케이드 게임이다. 익숙한 우주선 대신 원숭이가 바나나로 드론을 막는 설정을 더해 규칙은 즉시 이해되지만 시각적으로는 기억에 남는 게임을 목표로 했다.",
      "caseStudy": {
        "problem": {
          "summary": "배운 Unity 기능을 하나의 완결된 게임 루프로 묶기",
          "body": [
            "유니티 프로그래밍 수업에서 배운 입력 처리, 프리팹 생성, 충돌 이벤트, 씬 전환은 각각의 예제로 끝나기 쉽다. 이를 하나의 플레이 경험으로 연결해 고전 슈팅 게임의 회피·발사 구조를 컴포넌트와 상태 관리로 직접 구현하는 것이 출발점이었다.",
            "동시에 조작은 설명 없이 이해될 만큼 단순하면서도, 난이도 변화와 기억에 남는 콘셉트를 갖춘 게임이어야 했다."
          ]
        },
        "solution": {
          "summary": "원숭이 vs 드론, 단일 프리팹 3단계 90초 슈팅 게임",
          "body": [
            "우주선 대신 원숭이가 바나나로 드론을 막는 3D 아케이드 게임을 기획하고 Unity 2022.3 · C# · URP로 개발했다. 플레이어는 90초 동안 방향키로 위아래를 이동하고 Space 키로 바나나를 발사한다.",
            "조작은 위·아래 이동과 한 버튼 발사만 남기고, 적의 규칙이 순차적으로 변하도록 난이도를 설계했다. Stage 1은 움직임과 명중을 익히는 구간, Stage 2는 조준 탄환을 피하는 구간, Stage 3은 빠른 랜덤 생성 속에서 90초까지 생존하는 구간이다. 하나의 드론 프리팹이 스테이지 값에 따라 다르게 행동하도록 만들고, 시작·플레이·실패·성공 씬을 연결했다."
          ],
          "points": [
            {
              "label": "GameMaster.cs",
              "body": "게임 전체의 상태 머신으로, 매 프레임 플레이어 존재·90초 제한·EnemyLine 태그 개수를 검사해 Fail/Success 씬 이동과 1→2→3단계 진행을 처리한다. isStageChanging으로 중복 전환을 막고, Stage 3은 SpawnRandomStage() 코루틴이 1.5초마다 드론을 생성한다. 점수는 static score와 AddScore()로 공유해 TextMeshPro UI를 갱신한다."
            },
            {
              "label": "Monkey.cs · Banana.cs",
              "body": "Input.GetKey로 이동, Input.GetKeyDown으로 발사를 분리하고 이동을 -5.5~5.5로 제한한다. 바나나는 고정 Z 평면에서 이동 후 자동 제거되며 EnemyBullet과 충돌하면 함께 사라진다. 피격 시 isDead 설정과 Collider·MeshRenderer 비활성화 후 0.5초 뒤 제거해, 피격음 재생 후 실패 씬으로 넘어가게 했다."
            },
            {
              "label": "Drone.cs",
              "body": "SetStage(stage)가 isRandomEnemy, useFire, moveSpeedY, fireTime과 태그를 바꿔 한 프리팹을 세 패턴으로 재사용한다. Stage 1은 속도 3 라인 이동, Stage 2는 4초 간격 조준 사격, Stage 3은 개별 방향·속도 5·2초 사격이다. 라인형은 static 상태를 공유해 함께 방향을 바꾸고 왕복이 끝나면 X축으로 5만큼 전진한다."
            },
            {
              "label": "EnemyBullet.cs",
              "body": "SetTarget()으로 받은 플레이어 위치와 시작점의 Z값을 5로 고정하고 방향을 normalized 벡터로 저장해, 거리와 무관하게 일정 속도의 직선 궤도를 유지한다. dir × speed × Time.deltaTime으로 프레임 독립 이동을 적용하고, 모든 전투 좌표를 같은 Z 평면에 고정해 2D 슈팅처럼 안정적으로 판정되게 했다."
            },
            {
              "label": "Scene Flow · Debugging",
              "body": "SceneLoader가 Start, Invader01, Fail, Success 씬을 연결하고 오브젝트는 Player·Bullet·EnemyLine 등 태그로 역할을 구분한다. 분기마다 null 검사와 Debug.Log를 두었고, 라인형 적의 반복 방향 전환은 isChangingDirection 플래그로, 사망 직후 입력·충돌 재실행은 isDead와 Collider 비활성화 순서로 해결했다."
            }
          ]
        },
        "result": {
          "summary": "C#으로 완성한 전체 게임 루프, 학과 우수작 연합PT 선정",
          "body": [
            "입력–발사–충돌–점수–스테이지–승패–씬 전환으로 이어지는 전체 게임 루프를 C# 스크립트로 완성했다. 단일 Drone 프리팹에 단계별 파라미터와 집단·개별 이동을 결합해 적 수를 늘리지 않고도 난이도 변화를 만들었고, 코루틴과 상태 플래그로 지속 생성과 중복 실행을 제어했다. 학과 우수작 연합PT(유니티 프로그래밍, 2026)에 선정되었다.",
            "개별 기능 작성보다 각 스크립트가 어떤 상태를 소유하고 어떤 이벤트로 연결되는지 설계하는 일이 게임 프로그래밍의 핵심이라는 점을 배웠다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "Unity 3D 아케이드 게임"
        },
        {
          "k": "사용 툴",
          "v": "Unity 2022.3 · C# · URP"
        },
        {
          "k": "역할",
          "v": "게임 기획 및 Unity 개발"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "1bVQEpydCDbwR4N0nAQGbl3Q5rHg0KKh9",
            "label": "2026 · Invader · Video 01"
          }
        ],
        "decks": [],
        "images": [
          {
            "src": "Invader",
            "label": "Start"
          },
          {
            "src": "Invader-success",
            "label": "Success"
          }
        ],
        "links": [
          {
            "href": "https://github.com/yebum/Invader/blob/main/Assets/Scripts/GameMaster.cs",
            "label": "GameMaster.cs"
          },
          {
            "href": "https://github.com/yebum/Invader/blob/main/Assets/Scripts/Monkey.cs",
            "label": "Monkey.cs"
          },
          {
            "href": "https://github.com/yebum/Invader/blob/main/Assets/Scripts/Drone.cs",
            "label": "Drone.cs"
          },
          {
            "href": "https://github.com/yebum/Invader/blob/main/Assets/Scripts/EnemyBullet.cs",
            "label": "EnemyBullet.cs"
          },
          {
            "href": "https://github.com/yebum/Invader",
            "label": "GitHub"
          }
        ]
      }
    },
    {
      "id": "JalTayo",
      "title": "잘타요VR",
      "fullTitle": "잘타요VR",
      "context": "가상융합서비스개발자경진대회",
      "year": "2026",
      "discipline": "xr",
      "awards": [],
      "cover": "JalTayo",
      "lead": "잘타요VR은 VR 기술을 활용하여 어린이들이 안전하고 올바른 대중교통 이용 방법을 체험형 학습으로 익힐 수 있도록 돕는 교육용 VR 플랫폼 프로젝트이다. 특히 실제 버스 이용 경험이 부족한 어린이들도 가상 환경 속에서 직접 버스를 기다리고, 탑승하고, 교통카드를 태그하며, 하차벨을 누르고, 안전하게 하차하는 과정을 반복적으로 체험할 수 있도록 설계된 것이 특징이다.",
      "caseStudy": {
        "problem": {
          "summary": "시청형 안전교육으로는 버스 타는 법이 몸에 익지 않는다",
          "body": [
            "맞벌이 가정 증가와 생활 환경 변화로 어린이가 혼자 대중교통을 이용해야 하는 상황이 늘고 있다. 그러나 기존 대중교통 안전교육은 영상 시청이나 이론 중심이어서 실제 상황에 필요한 행동을 익히기 어렵다.",
            "버스 탑승 순서, 교통카드 태그, 하차벨 사용 같은 행동은 직접 해보지 않으면 익숙해지기 어려워, 어린이들이 실제 이용 과정에서 불안감을 느끼는 경우가 많다."
          ]
        },
        "solution": {
          "summary": "실제 버스 이용 순서를 따라 체험하는 어린이용 VR 교육",
          "body": [
            "어린이가 가상 환경에서 버스를 기다리고, 탑승하고, 교통카드를 태그하고, 하차벨을 누르고, 안전하게 하차하는 과정을 반복 체험하는 교육용 VR 플랫폼을 제안했다. 설명 중심이 아니라 사용자의 행동과 인터랙션으로 학습이 이루어지도록 했다.",
            "기획과 유니티 VR 개발을 맡아 전체 서비스 구조와 사용자 경험을 설계하고 구현했다. 주 사용자가 어린이인 점을 고려해 복잡한 조작보다 직관적인 학습 흐름을 우선했다. 사용 툴은 Unity, Blender이며, XR Interaction Toolkit으로 상호작용을 개발했다."
          ],
          "points": [
            {
              "label": "실제 순서의 튜토리얼",
              "body": "버스 대기–탑승–카드 태그–하차벨–하차를 실제 버스 이용과 같은 순서로 구성해 흐름을 자연스럽게 익히도록 했다."
            },
            {
              "label": "행동 기반 인터랙션",
              "body": "XR Interaction Toolkit과 Unity로 카드 태그, 하차벨, 좌석 탑승 등 실제 행동에 기반한 상호작용 시스템을 개발했다."
            },
            {
              "label": "행동에 반응하는 버스",
              "body": "사용자의 행동에 따라 버스가 정차하거나 이동하도록 구현해 실제 상황과 유사한 학습 경험을 제공했다."
            },
            {
              "label": "어린이 친화 UI",
              "body": "어린이 친화적인 UI와 시각 요소를 적용해 처음 VR을 접하는 사용자도 부담 없이 따라가도록 했다."
            }
          ]
        },
        "result": {
          "summary": "버스 이용 전 과정을 담은 체험형 VR 교육 콘텐츠 완성",
          "body": [
            "가상융합서비스개발자경진대회 프로젝트로, 버스 대기부터 탑승, 교통카드 태그, 하차벨 사용과 하차까지 이어지는 과정을 VR 인터랙션으로 구현한 체험형 교육 콘텐츠를 완성했다.",
            "이를 통해 설명 중심 안전교육을 보완하는 반복 체험형 대중교통 교육 콘텐츠의 가능성을 탐구했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "개발자 경진대회"
        },
        {
          "k": "사용 툴",
          "v": "Unity, Blender"
        },
        {
          "k": "역할",
          "v": "프로젝트 기획 및 VR 개발"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "1dBv6cmtXUyBU9nn36rhEE-YXPahZY590",
            "label": "2026 · 잘타요VR · Video 01"
          }
        ],
        "decks": [
          {
            "id": "1H4IHaQnr6T3gKzR1S486L8atYKDCbjJ2",
            "label": "2026 · 잘타요VR · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "JalTayo",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "PiratesStorm",
      "title": "PiratesStorm",
      "fullTitle": "Pirates Storm",
      "context": "유니티 프로그래밍",
      "year": "2026",
      "discipline": "xr",
      "awards": [
        "학과 우수작 연합PT"
      ],
      "cover": "PiratesStorm",
      "lead": "PiratesStorm은 슈팅 게임의 전투 시스템을 더 깊게 분석하기 위해 기획한 Unity 기반 2D 세로 슈팅 게임이다. 단순히 적을 없애 점수를 높이는 구조에서 벗어나 해적선을 조종해 함대를 돌파하고 코인을 모은 뒤 보스를 격파해 보물상자를 획득하는 모험 서사를 게임의 목표로 연결했다.",
      "caseStudy": {
        "problem": {
          "summary": "점수 쌓기를 넘어 계속 전진할 이유가 있는 슈팅 루프",
          "body": [
            "세로 슈팅 게임은 적을 없애 점수를 높이는 구조에 머물기 쉬워, 플레이어가 왜 계속 전진해야 하는지 설명하는 목표가 부족하다. 슈팅 게임의 전투 시스템을 더 깊게 분석하면서 명확한 목표와 클리어 조건을 가진 게임 루프를 설계하는 것을 과제로 삼았다.",
            "또한 반복 생성이 많은 장르 특성상 웨이브의 난이도와 리듬을 코드 수정 없이 조절할 수 있어야 했고, PC와 모바일에서 같은 조작 감각을 제공해야 했다."
          ]
        },
        "solution": {
          "summary": "해적선 항해 서사와 책임을 나눈 C# 컴포넌트 설계",
          "body": [
            "우주선 전투 구조를 해적선의 항해로 재해석하고, 적 처치–코인 수집–함대 돌파–보스 격파–보물 획득의 순서로 게임 루프를 기획했다. 공격은 자동 발사로 처리해 사용자가 회피와 위치 선정에 집중하도록 했고, PC에서는 마우스 드래그, 모바일에서는 한 손가락 터치로 이동하도록 입력을 나눴다.",
            "Unity 2022.3 · C# · URP 환경에서 게임 기획과 개발을 맡았다. 시간표 기반 적 웨이브, Catmull-Rom 경로 이동, 4단계 무기 패턴, 체력·무적 시간, 확률형 코인 드롭, 오브젝트 풀링과 무한 배경을 각각 독립된 C# 컴포넌트로 설계했다. 웨이브마다 경로·수량·속도·사격 확률을 Inspector 값으로 조절하게 해 스크립트를 다시 작성하지 않고 전투 리듬을 설계했다."
          ],
          "points": [
            {
              "label": "LevelController.cs · Wave.cs",
              "body": "LevelController가 enemyWaves의 timeToStart와 wave 프리팹을 읽어 각 웨이브를 독립 코루틴으로 예약한다. Wave는 count, speed, timeBetween, pathPoints, Loop와 Shooting 값을 묶어 관리하고, Catmull-Rom 보간 경로를 OnDrawGizmos로 에디터에서 미리 그려 직선·곡선·루프형 함대를 값만으로 구성했다."
            },
            {
              "label": "PlayerMoving.cs · PlayerShooting.cs",
              "body": "Camera.ViewportToWorldPoint()와 Borders 오프셋으로 해상도에 대응하는 이동 범위를 계산하고, 마우스·터치 입력을 Vector3.MoveTowards로 이동시킨 뒤 Mathf.Clamp로 경계 안에 고정한다. PlayerShooting은 Time.time과 nextFire로 자동 발사 주기를 제어하고, weaponPower 1~4를 switch로 분기해 1발에서 ±15도 5발까지 패턴을 확장하며 포구별 ParticleSystem을 함께 재생한다."
            },
            {
              "label": "Player.cs · Projectile.cs · Enemy.cs",
              "body": "Player는 체력 3과 UI 스프라이트를 관리하고, GetDamage()에서 nextDamage 이전의 연속 충돌을 무시해 무적 시간을 만든다. Projectile은 enemyBullet bool 하나로 피해 대상을 구분한다. Enemy는 Invoke로 무작위 발사를 예약하고, 파괴 시 점수 10점을 더하며 일반 적은 확률로 코인을, 보스는 treasureChestPrefab을 생성한다."
            },
            {
              "label": "PoolingController.cs · RepeatingBackground.cs",
              "body": "PoolingController는 프리팹을 Start()에서 미리 생성해 비활성화하고, GetPoolingObject()로 재사용하며 모두 사용 중이면 AddNewObject()로 풀을 확장한다. RepeatingBackground는 Y좌표가 -verticalSize 아래로 내려가면 verticalSize × 2만큼 올려 배경을 잇는다. 부모 Scale로 배경이 겹치던 문제는 Debug.Log 좌표 비교로 verticalSize 기준을 보정해 해결했다."
            },
            {
              "label": "GameController.cs · TreasureChest.cs",
              "body": "싱글톤 GameController가 점수, 코인, 게임오버 UI와 씬 재시작을 통합하고, GameOverCor()가 지연 뒤 게임오버 패널과 최종 점수를 표시한다. TreasureChest.OnTriggerEnter2D()는 Player 태그를 확인하고 isCollected로 중복 실행을 막은 뒤 Success 씬을 로드한다. SceneButtonController와 PopupController가 씬 이동과 조작 설명창을 담당한다."
            },
            {
              "label": "Architecture · Debugging",
              "body": "입력, 발사, 피해, 적, 웨이브, 레벨, 풀링, UI와 씬 전환으로 책임을 분리하고, 전역 시스템은 instance로, 웨이브별 값은 Serializable 클래스로 Inspector에 노출했다. 중복 피해는 nextDamage, 중복 보물 획득은 isCollected, 반복 발사는 Invoke와 CancelInvoke로 제어했고, 화면에서만 보이는 오류는 좌표 로그로 원인을 확인했다."
            }
          ]
        },
        "result": {
          "summary": "인트로부터 Success 씬까지 연결된 2D 슈팅 게임 완성",
          "body": [
            "시간표 기반 웨이브와 곡선 경로, 자동 사격과 4단계 무기, 체력·실드·점수·코인, 보스와 보물상자, 무한 배경과 사운드를 결합한 2D 슈팅 게임을 완성했다. PC와 모바일 조작을 함께 지원하고, 인트로 설명 팝업부터 게임오버·재시작·성공 화면까지 전체 사용자 흐름을 연결했다. 학과 우수작 연합PT(유니티 프로그래밍, 2026)에 선정됐다.",
            "데이터 기반 웨이브 설계, 오브젝트 재사용, 데미지 전달과 보상 분기가 하나의 게임 루프를 만드는 방식을 이해했고, 상태의 소유자와 스크립트 간 호출 방향을 정리해야 기능이 늘어나도 수정 범위를 통제할 수 있다는 점을 배웠다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "Unity 2D 슈팅 게임"
        },
        {
          "k": "사용 툴",
          "v": "Unity 2022.3 · C# · URP"
        },
        {
          "k": "역할",
          "v": "게임 기획 및 Unity 개발"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "1OhU5AiFPJhbOyiOw62D7QFOpNWXq_nb6",
            "label": "2026 · Pirates Storm · Video 01"
          }
        ],
        "decks": [],
        "images": [
          {
            "src": "PiratesStorm",
            "label": "Start"
          },
          {
            "src": "PiratesStorm-success",
            "label": "Success"
          }
        ],
        "links": [
          {
            "href": "https://github.com/yebum/PiratesStorm/blob/main/Assets/MySpaceShooter/Scipts/Wave.cs",
            "label": "Wave.cs"
          },
          {
            "href": "https://github.com/yebum/PiratesStorm/blob/main/Assets/MySpaceShooter/Scipts/PlayerShooting.cs",
            "label": "PlayerShooting.cs"
          },
          {
            "href": "https://github.com/yebum/PiratesStorm/blob/main/Assets/MySpaceShooter/Scipts/Enemy.cs",
            "label": "Enemy.cs"
          },
          {
            "href": "https://github.com/yebum/PiratesStorm/blob/main/Assets/MySpaceShooter/Scipts/PoolingController.cs",
            "label": "PoolingController.cs"
          },
          {
            "href": "https://github.com/yebum/PiratesStorm/blob/main/Assets/Pirates/Scripts/TreasureChest.cs",
            "label": "TreasureChest.cs"
          },
          {
            "href": "https://github.com/yebum/PiratesStorm",
            "label": "GitHub"
          }
        ]
      }
    },
    {
      "id": "TeamPL",
      "title": "팀플!",
      "fullTitle": "팀플!",
      "context": "제 3회 COSS 스타트업 경진대회",
      "year": "2026",
      "discipline": "ux",
      "awards": [
        "COSS 스타트업 경진대회 우수상"
      ],
      "cover": "TeamPL",
      "lead": "대학생 팀 프로젝트에서 발생하는 회의 불참, 정보 누락, 업무 혼선을 해결하기 위한 AI 기반 팀플 운영 플랫폼이다. 대학생 팀플에서는 수업 시간표, 아르바이트, 개인 일정 등으로 인해 모든 팀원이 매번 회의에 참여하기 어렵다. 문제는 단순히 회의에 빠지는 것이 아니라, 회의 이후 공유되는 회의록만으로는 논의의 흐름과 결정의 이유를 충분히 이해하기 어렵다는 점이다.",
      "caseStudy": {
        "problem": {
          "summary": "회의록만으로는 전달되지 않는 팀플 회의의 맥락",
          "body": [
            "대학생 팀 프로젝트에서는 수업 시간표, 아르바이트, 개인 일정 등으로 모든 팀원이 매번 회의에 참여하기 어렵고, 그 결과 회의 불참, 정보 누락, 업무 혼선이 반복된다.",
            "핵심 문제는 회의에 빠지는 것 자체가 아니라, 회의 이후 공유되는 회의록만으로는 논의의 흐름과 결정의 이유를 이해하기 어렵다는 점이다. 불참한 팀원은 공유된 자료만 보고는 왜 특정 방향으로 결정이 내려졌는지 알지 못한 채 다음 작업을 이어가야 한다."
          ]
        },
        "solution": {
          "summary": "회의 맥락을 복원하는 대학생 팀플용 AI 협업 플랫폼",
          "body": [
            "“회의록이 아니라 회의 맥락을 복원하는 것”을 핵심 콘셉트로 잡았다. AI가 회의 내용을 분석해 발언의 배경, 논의가 전환된 이유, 최종 결정이 형성되는 과정을 함께 보여주고, 불참자가 회의 흐름을 빠르게 따라잡을 수 있도록 했다. 지난 회의에 참석하지 못한 사용자의 대표 시나리오를 설계하고, 이를 바탕으로 4개의 핵심 기능을 도출했다.",
            "프로젝트 기획과 발표 자료 제작을 맡아 ChatGPT, Figma, Stitch를 활용했다. 경진대회 시연을 고려해 MVP는 외부 툴 연동보다 웹 기반 데모 화면 중심으로 기획하고, 랜딩페이지–회의 업로드–AI 분석–회의 흐름 요약–맥락 리플레이–업무 카드의 6개 화면으로 구성했다. 서비스 이미지를 전달하기 위해 3D 캐릭터 기반 원격 회의 비주얼과 스타트업 랜딩페이지 형식의 웹사이트도 함께 제작했다."
          ],
          "points": [
            {
              "label": "AI 회의 흐름 요약",
              "body": "회의 내용을 단순 요약이 아니라 논의가 전개된 순서와 핵심 결정 중심으로 정리한다."
            },
            {
              "label": "캐릭터 기반 맥락 리플레이",
              "body": "AI가 정리한 회의 흐름을 바탕으로 팀원 캐릭터들이 대화하듯 회의 내용을 재현해, 불참자가 실제 회의 전개를 시각적으로 따라갈 수 있게 한다."
            },
            {
              "label": "업무 카드 자동 생성",
              "body": "회의 내용을 업무 카드로 정리해 팀이 논의하고 결정한 내용을 실행으로 이어가도록 한다."
            },
            {
              "label": "AI 질문 기능",
              "body": "불참자용 따라잡기 경험을 구성하는 핵심 기능 중 하나로 AI 질문 기능을 포함했다."
            }
          ]
        },
        "result": {
          "summary": "4개 핵심 기능·6개 MVP 화면으로 구체화, 우수상 수상",
          "body": [
            "아이디어 수준에 머무르지 않고 문제 정의, 사용자 시나리오, 핵심 기능, MVP 구조, 웹사이트 시안, 수익모델까지 포함한 스타트업형 서비스 기획으로 발전시켰다. 회의 영상을 처음부터 다시 보는 대신 약 5분 안에 지난 회의의 핵심 흐름과 본인의 역할을 파악하는 경험을 목표로 제시했고, 제3회 COSS 스타트업 경진대회에서 우수상을 받았다.",
            "팀플의 비효율을 기록의 문제가 아닌 팀원 간 맥락 공유의 문제로 재정의했으며, 캡스톤디자인, 창업 수업, 공모전 팀, 해커톤 운영 기관, 초기 스타트업 팀으로의 확장 가능성을 정리했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "스타트업 경진대회"
        },
        {
          "k": "사용 툴",
          "v": "ChatGPT, Figma, Stitch"
        },
        {
          "k": "역할",
          "v": "프로젝트 기획 및 발표 자료 제작"
        }
      ],
      "media": {
        "films": [],
        "decks": [
          {
            "id": "1vUOMus0FEbTqhQKHVSmslc3Jl8AiEQYA",
            "label": "2026 · 팀플! · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "TeamPL",
            "label": ""
          }
        ],
        "links": [
          {
            "href": "https://clinquant-phoenix-3354a0.netlify.app/",
            "label": "Live website"
          }
        ]
      }
    },
    {
      "id": "dndn",
      "title": "든든AI",
      "fullTitle": "든든AI",
      "context": "Y-Startup",
      "year": "2026",
      "discipline": "ux",
      "awards": [],
      "cover": "dndn",
      "lead": "든든 AI는 AI 기술을 활용하여 누구나 쉽게 콘텐츠를 제작하고 수익을 창출할 수 있도록 돕는 서비스 프로젝트이다. 특히 디지털 콘텐츠 제작 경험이 부족한 사용자들도 AI를 활용해 간단한 과정만으로 숏폼 영상 콘텐츠를 제작하고 업로드할 수 있도록 돕는 것을 목표로 한다. 이 프로젝트는 콘텐츠 제작의 진입 장벽을 낮추고, AI 기반 창작 환경을 통해 새로운 형태의 개인 수익 창출 모델을 제안한다.",
      "metrics": {
        "title": "6주 실증 실험",
        "source": "발표 자료 p.8–10 · 팀 검증 결과",
        "groups": [
          {
            "kind": "bars",
            "label": "중장년층 설문",
            "sample": "구글폼 설문 50명",
            "items": [
              {
                "label": "통합된 AI 툴 필요",
                "value": 90
              },
              {
                "label": "유료 사용 의향",
                "value": 80
              },
              {
                "label": "부업 고민 경험",
                "value": 70
              },
              {
                "label": "AI 사용이 어렵다",
                "value": 65
              }
            ]
          },
          {
            "kind": "stats",
            "label": "유튜브 채널 PoC",
            "sample": "5일 내 채널 개설 후 든든AI로 영상 제작",
            "items": [
              {
                "value": "1만 회+",
                "label": "5일 누적 조회수"
              },
              {
                "value": "10분 이내",
                "label": "영상 1편 제작 시간"
              }
            ]
          },
          {
            "kind": "stats",
            "label": "오프라인 실습 특강",
            "sample": "협력업체 중년유튜브학교 수강생",
            "items": [
              {
                "value": "24시간",
                "label": "모집 정원 마감까지"
              },
              {
                "value": "1시간",
                "label": "수강생 영상 제작·발행 성공까지"
              }
            ]
          }
        ]
      },
      "caseStudy": {
        "problem": {
          "summary": "중장년층에게 높은 숏폼 콘텐츠 제작 진입 장벽",
          "body": [
            "유튜브 쇼츠, 틱톡 등 숏폼 콘텐츠 시장이 빠르게 성장하면서 개인이 콘텐츠로 수익을 창출할 기회가 커지고 있다. 하지만 영상 기획, 편집, 제작 과정은 여전히 많은 시간과 기술을 요구해 디지털 제작 환경에 익숙하지 않은 사용자에게는 진입 장벽이 된다. 특히 중장년층은 콘텐츠 제작 도구에 대한 접근성이 낮아 이 흐름에 참여하기 어렵다."
          ]
        },
        "solution": {
          "summary": "간단한 단계로 숏폼을 만드는 AI 콘텐츠 제작 서비스",
          "body": [
            "든든 AI는 AI 기반 자동 콘텐츠 제작 시스템을 통해 누구나 간단한 과정만으로 숏폼 영상을 제작·업로드하고, 부업 형태의 수익 활동을 시작할 수 있도록 기획한 서비스다.",
            "외부 참여자로 합류해 Figma로 UI/UX 기획과 디자인을 담당하며 서비스 구조와 사용자 경험을 설계했다. 주요 타깃인 중장년층을 고려해 복잡한 기능보다 직관적인 사용 흐름에 중점을 두고, 전체 앱을 단순한 단계로 구성해 AI를 처음 접하는 사용자도 제작 과정을 따라갈 수 있게 했다. 생성형 AI가 영상을 만드는 대기 시간에 사용자가 이탈하지 않도록 진행 상태를 전달하는 로딩 페이지와 인터랙션도 구성했다."
          ],
          "points": [
            {
              "label": "AI 콘텐츠 제작 흐름",
              "body": "영상 아이디어 생성부터 스크립트 작성, 영상 제작까지 AI를 활용해 이어지는 제작 흐름을 제안했다."
            },
            {
              "label": "단순한 단계형 앱 플로우",
              "body": "중장년층 사용자를 고려해 전체 앱을 단순한 단계로 나누고, AI 기능을 처음 접하는 사용자도 따라갈 수 있는 인터페이스를 설계했다."
            },
            {
              "label": "대기 시간 로딩 경험",
              "body": "생성형 AI의 영상 제작 대기 시간 동안 진행 상태를 자연스럽게 전달하는 로딩 페이지와 인터랙션으로 이탈을 줄이도록 했다."
            }
          ]
        },
        "result": {
          "summary": "6주 실증: 설문 50명, 5일 만에 조회수 1만 회+",
          "body": [
            "Y-Startup 창업 경진대회 프로젝트로, AI를 활용해 영상 아이디어 생성부터 스크립트 작성, 영상 제작까지 이어지는 콘텐츠 제작 흐름을 제안하는 서비스 콘셉트와 UI/UX 설계를 완성했다.",
            "팀은 6주 동안 설문, 커뮤니티, 실제 제작, 오프라인 교육으로 이어지는 행동 기반 검증을 진행했다. 중장년층 50명 설문에서 통합된 AI 툴이 필요하다는 응답이 90%, 유료 사용 의향이 80%였고, 5일 안에 유튜브 채널을 개설해 누적 조회수 1만 회 이상을 달성하며 수익화 가능성 PoC를 확보했다. 오프라인 실습 특강은 모집 24시간 안에 정원이 마감됐고, 수강생이 1시간 안에 영상 제작·발행에 성공했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "창업 경진대회"
        },
        {
          "k": "사용 툴",
          "v": "Figma"
        },
        {
          "k": "역할",
          "v": "UI/UX 기획 및 디자인"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "1wLRtBVc6J5XIy4k1-HjJAQ0x_9YOO8zy",
            "label": "2026 · 든든AI · Video 01"
          }
        ],
        "decks": [
          {
            "id": "1tfKhd0_O-NiNJvgiWghQEl2nztwo0W11",
            "label": "2026 · 든든AI · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "dndn",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "CITY",
      "title": "CITY",
      "fullTitle": "CITY: Civic Innovation Through You",
      "context": "NextGen Startup Challenge",
      "year": "2026",
      "discipline": "ux",
      "awards": [
        "NextGen Startup Challenge 3rd Prize"
      ],
      "cover": "CITY01",
      "lead": "CITY는 시민과 행정 간의 소통 구조를 개선하기 위해 기획된 시민 참여 플랫폼 프로젝트이다. 단순한 민원 시스템을 넘어 시민들이 도시 문제에 대해 의견을 제안하고 토론하며 해결 과정에 참여할 수 있는 디지털 커뮤니티 환경을 만드는 것을 목표로 한다. 이 프로젝트는 온라인 플랫폼을 통해 시민 참여를 활성화하고 도시 정책 과정에 시민의 목소리를 보다 효과적으로 반영할 수 있는 새로운 참여 모델을 제안한다.",
      "metrics": {
        "title": "주민 검증",
        "source": "발표 자료 p.3, p.31",
        "groups": [
          {
            "kind": "stats",
            "label": "문제 근거",
            "sample": "발표 자료에 인용된 시민 설문",
            "items": [
              {
                "value": "85%",
                "label": "공공기관이 시민 의견을 중요하게 여기지 않는다고 느끼는 시민"
              }
            ]
          },
          {
            "kind": "stack",
            "label": "콘셉트 반응",
            "sample": "지역 주민 18명 · 콘셉트 설명 후 약 3분 인터뷰",
            "items": [
              {
                "label": "긍정",
                "value": 61,
                "n": 11,
                "sub": "진행 상황의 투명한 공유, 보상 기반 참여 동기"
              },
              {
                "label": "중립",
                "value": 28,
                "n": 5,
                "sub": "운영 지속성과 인력, 보상 모델 검증 필요"
              },
              {
                "label": "부정",
                "value": 11,
                "n": 2,
                "sub": "투표 조작 우려, 프라이버시와 참여 피로"
              }
            ]
          }
        ]
      },
      "caseStudy": {
        "problem": {
          "summary": "일방향 민원 구조에 머문 시민–행정 소통",
          "body": [
            "기존 민원 시스템은 시민이 의견을 일방적으로 전달하는 구조여서 시민 참여가 제한적이고, 문제 해결 과정에 시민의 지속적인 참여를 이끌어내기 어렵다. 그 결과 도시 문제에 대한 시민의 목소리가 정책 과정에 효과적으로 반영되기 어렵고, 행정과의 소통도 투명하게 드러나지 않는다."
          ]
        },
        "solution": {
          "summary": "제안·토론·행정 피드백을 잇는 시민 참여 플랫폼",
          "body": [
            "CITY는 단순한 민원 시스템을 넘어 시민이 도시 문제에 대해 의견을 제안하고 토론하며 해결 과정에 참여하는 디지털 커뮤니티 플랫폼이다. SNS와 유사한 구조로 시민들이 의견을 공유하고 다른 사용자와 토론하며, 행정 기관과의 소통을 보다 투명하게 진행하도록 설계했다.",
            "미국 대학생들이 진행하던 프로젝트에 한국 팀원으로 합류해 아이디어와 방향을 함께 구체화했다. 서비스 세부 기획을 맡아 플랫폼 구조와 기능을 정리하고 시민 참여 흐름 중심으로 UX/UI를 설계했으며, 팀원들이 같은 방향을 공유하도록 구조와 사용자 흐름을 Figma, PowerPoint로 시각화한 데모를 만들었다. 이후 현지 필드 리서치에서 시민들에게 콘셉트를 설명하고 수집한 피드백을 반영해 구조와 기능을 보완했다."
          ],
          "points": [
            {
              "label": "시민 의견 제안",
              "body": "시민이 도시 문제에 대한 의견을 자유롭게 제안하고 공유한다."
            },
            {
              "label": "커뮤니티 토론",
              "body": "SNS와 유사한 구조에서 다른 사용자들과 도시 문제를 두고 토론한다."
            },
            {
              "label": "행정 피드백",
              "body": "행정 기관과의 소통을 플랫폼 안에서 보다 투명하게 진행하도록 했다."
            }
          ]
        },
        "result": {
          "summary": "주민 18명 중 61% 긍정, NextGen 3rd Prize",
          "body": [
            "시민 의견 제안, 커뮤니티 토론, 행정 피드백 기능을 포함한 시민 참여 플랫폼 콘셉트를 완성했다. 지역 주민 18명에게 콘셉트를 설명한 뒤 약 3분간 인터뷰한 결과 긍정 61%(11명), 중립 28%(5명), 부정 11%(2명)로 나타났다. 긍정 응답은 진행 상황의 투명한 공유와 보상 기반 참여 동기에 모였고, 운영 지속성·보상 모델 검증·프라이버시는 보완 과제로 확인했다.",
            "국제 협업 환경에서 진행한 이 프로젝트는 NextGen Startup Challenge 최종 발표에서 3rd Prize를 받았다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "창업 경진대회"
        },
        {
          "k": "사용 도구",
          "v": "Figma, PowerPoint"
        },
        {
          "k": "역할",
          "v": "서비스 기획 · UX/UI 디자인"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "165wWmOvIh6XDsoWgs2Cz4bZukWXie9S_",
            "label": "2026 · CITY: Civic Innovation Through You · Video 01"
          }
        ],
        "decks": [
          {
            "id": "1pDGy4QFKj2mA4kPbb1UaeIiLeWrnDanh",
            "label": "2026 · CITY: Civic Innovation Through You · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "CITY01",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "Jeonger",
      "title": "Jeonger",
      "fullTitle": "Jeonger",
      "context": "Think City 2026 Hackathon",
      "year": "2026",
      "discipline": "ux",
      "awards": [
        "Think City Hackathon 2nd Prize"
      ],
      "cover": "Jeonger",
      "lead": "Jeonger는 지역사회에서 도움이 필요한 노인과 도움을 제공할 수 있는 지역 구성원을 연결하는 커뮤니티 기반 매칭 플랫폼을 제안하는 프로젝트이다. ‘정(情)’이라는 개념에서 출발하여 단순한 노동 매칭을 넘어 세대 간 교류와 지역 공동체 회복을 목표로 한다. 이 프로젝트는 일상적인 생활 지원이 필요한 노인과 지역 구성원을 연결하여 지역 사회 내에서 서로 돕는 구조를 만드는 서비스 모델을 제안한다.",
      "caseStudy": {
        "problem": {
          "summary": "고령화 속 독거 노인 증가와 지역사회 돌봄 공백",
          "body": [
            "한국과 미국 모두에서 고령화가 진행되면서 독거 노인의 증가와 지역사회 돌봄 문제가 공통적인 사회 이슈로 나타나고 있다. 이 문제는 행정 시스템만으로 해결하기 어렵고, 지역 커뮤니티 기반의 참여가 필요하다.",
            "해커톤에서 한국과 미국 팀원들이 함께 브레인스토밍하며, 일상적인 생활 지원이 필요한 노인과 이를 도울 수 있는 지역 구성원이 서로 연결되지 못하는 상황을 두 사회의 공통 문제로 정의했다."
          ]
        },
        "solution": {
          "summary": "노인과 지역 구성원을 잇는 정(情) 기반 매칭 플랫폼",
          "body": [
            "Jeonger는 도움이 필요한 노인과 도움을 제공할 수 있는 지역 구성원을 연결하는 커뮤니티 기반 매칭 플랫폼이다. ‘정(情)’이라는 개념에서 출발해 단순한 노동 매칭을 넘어 세대 간 교류와 지역 공동체 회복을 목표로 하고, 지역 사회 안에서 서로 돕는 구조를 만드는 서비스 모델로 기획했다.",
            "서비스 기획을 담당해 플랫폼의 핵심 구조와 사용자 흐름을 정리하고, Figma로 발표 문서를 제작해 핵심 메시지와 서비스 구조가 명확히 전달되도록 구성했다. Think City 2026 Hackathon의 제한된 시간 안에 언어와 문화 차이가 있는 국제 협업 환경에서 의견을 조율하며 아이디어를 구체화했다."
          ],
          "points": []
        },
        "result": {
          "summary": "Community Impact Award 2nd Prize 수상",
          "body": [
            "지역사회 안에서 노인과 도움 제공자를 연결하는 커뮤니티 기반 서비스 모델을 최종 발표까지 완성했다. 세대 간 연결과 지역 공동체의 상호 도움 구조를 중심으로 한 서비스 가능성을 제시했고, Think City Hackathon 2026에서 Community Impact Award 2nd Prize를 받았다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "해커톤"
        },
        {
          "k": "사용 도구",
          "v": "Figma"
        },
        {
          "k": "역할",
          "v": "서비스 기획 · 발표 문서 제작"
        }
      ],
      "media": {
        "films": [],
        "decks": [
          {
            "id": "1SEB_wZJ091y3TBxCYEev0TQSTiCqqPdu",
            "label": "2026 · Jeonger · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "Jeonger",
            "label": ""
          }
        ],
        "links": [
          {
            "href": "https://yebum.github.io/Jeonger/",
            "label": "Live website"
          }
        ]
      }
    },
    {
      "id": "toss",
      "title": "토스증권 광고",
      "fullTitle": "토스증권 광고",
      "context": "3D모션그래픽스",
      "year": "2025",
      "discipline": "motion",
      "awards": [
        "학과 우수작 연합PT"
      ],
      "cover": "toss",
      "lead": "본 프로젝트는 토스증권의 브랜드 메시지를 전달하기 위해 제작한 3D 모션그래픽 광고 영상이다. ‘모두를 위한 투자’라는 메시지를 중심으로 토스증권의 직관적인 투자 경험과 접근성을 시각적으로 표현하는 것을 목표로 하였다. 스마트폰 인터페이스, 금융 그래프, 다양한 오브젝트 등을 활용하여 투자 서비스를 쉽고 친근하게 전달하는 광고 콘텐츠를 제작하였다.",
      "caseStudy": {
        "problem": {
          "summary": "‘모두를 위한 투자’를 3D 영상 언어로 옮기기",
          "body": [
            "모바일 기반 투자 서비스가 대중화되면서 금융 서비스는 점점 더 직관적이고 사용자 친화적인 경험을 요구받고 있다. 토스증권은 간편한 인터페이스와 접근성을 강조하는 브랜드로, ‘모두를 위한 투자’라는 메시지를 중심으로 직관적인 투자 경험과 서비스의 확장성을 한 편의 광고 영상 안에서 쉽고 친근하게 전달해야 했다."
          ]
        },
        "solution": {
          "summary": "UI·그래프 오브젝트가 끊김 없이 이어지는 3D 광고",
          "body": [
            "스토리보드로 전체 씬의 흐름과 메시지 전달 구조를 먼저 설계했다. 이후 Blender와 Maya로 스마트폰 인터페이스, 금융 그래프, 아이콘 등 주요 3D 오브젝트를 직접 모델링하고 장면에 맞게 텍스처 작업을 진행했다.",
            "카메라 이동과 오브젝트의 움직임으로 장면 간 전환을 부드럽게 연결해 영상 전체의 몰입도를 높이고, 3D 오브젝트와 2D 그래픽 요소가 어우러지도록 구성해 시각적 균형을 유지했다. 마지막으로 After Effects에서 렌더링된 영상과 그래픽 요소를 합성하고 색감, 타이밍, 모션 디테일을 조정해 최종 영상을 완성했다. 기획부터 제작, 발표까지 직접 맡았다."
          ],
          "points": [
            {
              "label": "스토리보드 설계",
              "body": "전체 씬의 흐름과 메시지 전달 구조를 스토리보드로 먼저 정리했다."
            },
            {
              "label": "3D 오브젝트 제작",
              "body": "Blender와 Maya로 스마트폰 인터페이스, 금융 그래프, 아이콘 등을 직접 모델링하고 텍스처 작업을 했다."
            },
            {
              "label": "끊김 없는 씬 전환",
              "body": "카메라 이동과 오브젝트의 움직임을 활용해 장면이 끊기지 않고 자연스럽게 이어지도록 설계했다."
            },
            {
              "label": "합성과 마무리",
              "body": "After Effects에서 3D 렌더와 2D 그래픽을 합성하고 색감, 타이밍, 모션 디테일을 조정했다."
            }
          ]
        },
        "result": {
          "summary": "학과 우수작 선정, 연합 PT 발표작으로 소개",
          "body": [
            "토스증권의 브랜드 메시지를 전달하는 3D 모션그래픽 광고 영상을 완성했다. 스토리보드 기획부터 3D 오브젝트 제작, 모션 연출, 영상 편집까지 광고 제작의 전 과정을 직접 수행했다. 작품의 완성도와 기획력을 인정받아 3D모션그래픽스 수업의 학과 우수작으로 선정되었고, 연합 PT 발표 작품으로 소개됐다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "3D모션그래픽 광고"
        },
        {
          "k": "사용 도구",
          "v": "Figma · Blender · After Effects · Premiere Pro"
        },
        {
          "k": "역할",
          "v": "프로젝트 기획 · 제작 · 발표"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "1VoEqZAsS8xkAm3E8MO1A1aWr6JMTooqw",
            "label": "2025 · 토스증권 광고 · Video 01"
          }
        ],
        "decks": [
          {
            "id": "1Su_Uf8-D8JcqjWiwdS3QK164y_9119wK",
            "label": "2025 · 토스증권 광고 · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "toss",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "sds",
      "title": "스대살",
      "fullTitle": "스대살: 스위스에서 대학생으로 살아남기",
      "context": "콘텐츠디자인",
      "year": "2025",
      "discipline": "ux",
      "awards": [],
      "cover": "sds",
      "lead": "스대살은 스위스에서 생활하는 대학생들이 현지 생활 정보를 쉽게 얻고 서로 경험을 공유할 수 있도록 기획한 웹 서비스 프로젝트이다. 유학생들이 겪는 정보 부족 문제를 해결하기 위해 생활 정보, 언어 교류, 커뮤니티 기능을 통합한 플랫폼을 제안하였다. 이를 통해 해외에서 생활하는 대학생들이 보다 쉽게 현지 생활에 적응할 수 있는 환경을 제공하는 것을 목표로 하였다.",
      "caseStudy": {
        "problem": {
          "summary": "스위스 유학생이 겪는 생활 정보 부족과 단절",
          "body": [
            "해외에서 생활하는 대학생들은 언어 장벽, 생활 정보 부족, 문화 차이 등 다양한 문제를 겪는다. 특히 스위스는 생활비와 문화적 차이가 큰 국가로, 현지에서 필요한 실질적인 정보를 얻기 어려운 경우가 많다. 단순한 정보 제공을 넘어, 학생들이 경험을 공유하고 서로 도움을 주고받으며 현지 생활에 적응할 수 있는 연결 구조가 필요했다."
          ]
        },
        "solution": {
          "summary": "생활 정보·언어 교류·커뮤니티·마켓을 묶은 웹 플랫폼",
          "body": [
            "유학생들이 겪는 주요 문제를 분석해 필요한 기능을 정의하고, 해외 생활 정보 서비스와 커뮤니티 플랫폼의 레퍼런스를 리서치해 서비스 구조를 설계했다. 플랫폼은 생활 정보, 언어 교류, 커뮤니티, 생활 마켓의 네 가지 핵심 기능을 중심으로 구성했다.",
            "이 기능들을 기반으로 사용자 흐름을 설계하고, Figma로 실제 서비스 형태의 웹 UI를 제작했다. 컬러 시스템, 타이포그래피, UI 레이아웃을 정리해 일관된 디자인 시스템을 구축하고, 플랫폼 전체의 사용자 경험이 자연스럽게 이어지도록 했다. 기획부터 제작, 발표까지 맡았다."
          ],
          "points": [
            {
              "label": "스위스 생활 정보",
              "body": "스위스 생활 정보를 제공하는 메인 서비스다."
            },
            {
              "label": "언어 교류 프로그램",
              "body": "유학생들이 서로 언어 교류를 할 수 있는 프로그램이다."
            },
            {
              "label": "커뮤니티",
              "body": "학생들이 경험과 정보를 공유하는 커뮤니티 기능이다."
            },
            {
              "label": "생활 마켓",
              "body": "현지 생활에 필요한 정보를 공유하는 생활 마켓 기능이다."
            }
          ]
        },
        "result": {
          "summary": "네 기능을 하나의 흐름으로 연결한 웹 UI 완성",
          "body": [
            "스위스 생활 정보, 언어 교류, 커뮤니티, 생활 마켓을 하나의 흐름으로 연결한 ‘스대살’의 웹 UI 디자인을 완성했다. 해외 유학생이 겪는 정보 부족 문제를 기능 구조로 구체화하고, 이를 일관된 디자인 시스템과 사용자 중심의 웹 인터페이스로 구현했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "웹 디자인"
        },
        {
          "k": "사용 도구",
          "v": "Figma"
        },
        {
          "k": "역할",
          "v": "프로젝트 기획 · 제작 · 발표"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "1tTaCRIh8sJ4Vloc5zrC2YDQmvoQ9a4hq",
            "label": "2025 · 스대살: 스위스에서 대학생으로 살아남기 · Video 01"
          }
        ],
        "decks": [
          {
            "id": "1HrcltPkX0Wb9poozIlV3RdgQ8YHSkgBR",
            "label": "2025 · 스대살: 스위스에서 대학생으로 살아남기 · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "sds",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "supporters",
      "title": "슈퍼플레이 서포터즈 2기",
      "fullTitle": "슈퍼플레이 서포터즈 2기",
      "context": "슈퍼플레이",
      "year": "2025",
      "discipline": "motion",
      "awards": [],
      "cover": "supporters",
      "lead": "슈퍼플레이 서포터즈 활동을 통해 e-sports 및 게임 문화 공간을 소개하는 콘텐츠를 제작하였다. 게임 팬들이 실제로 방문하거나 경험할 수 있는 공간을 직접 탐방하고 이를 카드뉴스와 영상 콘텐츠 형태로 제작하여 온라인 플랫폼에서 소개하는 활동을 진행하였다. 매장의 분위기, 체험 요소, 브랜드 아이덴티티 등을 콘텐츠로 전달하며 사용자들이 공간을 간접적으로 경험할 수 있도록 구성하였다.",
      "caseStudy": {
        "problem": {
          "summary": "가보지 않은 게임 문화 공간을 온라인으로 전하기",
          "body": [
            "슈퍼플레이 서포터즈로서 e-sports 및 게임 문화 공간을 온라인 플랫폼에서 소개해야 했다. 매장의 분위기, 체험 요소, 브랜드 아이덴티티를 사용자가 방문하지 않고도 간접적으로 경험할 수 있어야 했다. 같은 공간 정보라도 SNS에서 핵심을 빠르게 파악하게 할 때와 공간의 분위기를 생생하게 보여줄 때는 전달 방식과 스토리 구성이 달라야 했다."
          ]
        },
        "solution": {
          "summary": "카드뉴스 2편·영상 3편, 형식별로 다른 스토리 구성",
          "body": [
            "게임 팬들이 실제로 방문하거나 경험할 수 있는 공간을 직접 탐방하고, Figma, After Effects, Premiere Pro를 활용해 카드뉴스와 롱폼 영상 콘텐츠로 제작했다. 카드뉴스는 SNS에서 핵심 정보를 빠르게 파악할 수 있도록 시각적으로 정리하고, 영상은 공간의 분위기와 체험 요소가 생생하게 전달되도록 촬영과 편집을 진행했다.",
            "카드뉴스는 방문자가 매장을 둘러보는 흐름에 맞춰 정보 순서를 구성했고, 영상은 탐방 브이로그, 일일 아르바이트 체험, 직원 인터뷰 등 콘텐츠 성격에 맞춰 스토리 흐름을 정리했다. 영상은 편마다 촬영·편집 또는 편집을 담당했다."
          ],
          "points": [
            {
              "label": "CardNews 01",
              "body": "슈퍼플레이 의왕점을 소개하는 카드뉴스로, 굿즈샵·게이밍 장비·게임 체험 공간을 매장을 실제로 둘러보는 순서에 맞춰 사진과 함께 구성했다."
            },
            {
              "label": "CardNews 02",
              "body": "T1 베이스캠프 PC방의 위치, 운영시간, 내부 시설과 게이밍 장비·굿즈 공간·식음 메뉴를 단계적으로 보여줬다. 강렬한 레드 컬러와 그래픽 요소로 e-sports 브랜드 이미지에 맞는 스타일을 적용했다."
            },
            {
              "label": "Video 01",
              "body": "PUBG 성수 매장을 방문해 공간을 체험하는 브이로그로, 촬영과 편집을 담당했다. 방문 과정과 매장 내부 경험을 탐방 흐름에 맞춰 구성했다."
            },
            {
              "label": "Video 02",
              "body": "새로 오픈한 메이플 아지트에서 일일 아르바이트를 체험하는 영상으로, 편집을 담당했다. 체험 과정의 주요 장면을 중심으로 매장 운영 방식과 현장 분위기를 따라가기 쉽게 정리했다."
            },
            {
              "label": "Video 03",
              "body": "홍대 슈퍼플레이 매장을 소개하는 영상으로, 편집을 담당했다. 직원 인터뷰와 매장 촬영 장면을 연결해 매장의 분위기와 정보를 함께 전달했다."
            }
          ]
        },
        "result": {
          "summary": "5개 게임 문화 공간을 카드뉴스·영상으로 소개",
          "body": [
            "슈퍼플레이 서포터즈 2기 활동으로 카드뉴스 2편과 영상 3편을 제작해 슈퍼플레이 의왕점, T1 베이스캠프 PC방, PUBG 성수 매장, 메이플 아지트, 홍대 슈퍼플레이 매장을 온라인 플랫폼에서 소개했다. 같은 공간 정보를 형식에 따라 다르게 구성해, 사용자가 매장의 분위기와 체험 요소를 간접적으로 경험할 수 있도록 전달했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "콘텐츠 제작"
        },
        {
          "k": "사용 도구",
          "v": "Figma · After Effects · Premiere Pro"
        },
        {
          "k": "역할",
          "v": "프로젝트 기획 · 제작"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "1uUJxAylaoHZdA5825NYAI2BrbS_U8Cx9",
            "label": "2025 · 슈퍼플레이 서포터즈 2기 · Video 01"
          },
          {
            "kind": "drive",
            "id": "1TF4v7MfsLaEnBrUWzrccVR5sIKCRvD_T",
            "label": "2025 · 슈퍼플레이 서포터즈 2기 · Video 02"
          },
          {
            "kind": "drive",
            "id": "1DBZCxx29Sk1qMgCh2TVqvA9DeZADp1c7",
            "label": "2025 · 슈퍼플레이 서포터즈 2기 · Video 03"
          }
        ],
        "decks": [
          {
            "id": "1LSL1heUjAEidimMM9U11UW_caHeAXls0",
            "label": "2025 · 슈퍼플레이 서포터즈 2기 · Presentation 01"
          },
          {
            "id": "1tlOMW97xPLHF73XSXjM_yCjv69ZZOQ7r",
            "label": "2025 · 슈퍼플레이 서포터즈 2기 · Presentation 02"
          }
        ],
        "images": [
          {
            "src": "supporters",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "learncation",
      "title": "가치 제주, 고치 제주",
      "fullTitle": "가치 제주, 고치 제주",
      "context": "제주가치 공감, 런케이션 해커톤",
      "year": "2025",
      "discipline": "ux",
      "awards": [
        "런케이션 해커톤 장려상"
      ],
      "cover": "learncation",
      "lead": "‘가치 제주, 고치 제주’는 제주 지역의 환경 문제와 지역 문화 자원을 결합하여 지속 가능한 체험형 관광 모델을 제안한 프로젝트이다. 단순한 관광이 아니라 지역 환경 보존과 문화 체험을 동시에 경험할 수 있는 프로그램을 설계하여, 방문객이 제주 자연과 지역 공동체의 가치를 이해하고 참여할 수 있도록 하는 것을 목표로 하였다.",
      "caseStudy": {
        "problem": {
          "summary": "관광 확대가 부른 제주의 환경 훼손",
          "body": [
            "제주는 아름다운 자연환경을 기반으로 많은 관광객이 방문하는 지역이지만, 관광 산업이 확대되면서 환경 오염과 지역 생태계 훼손 문제가 지속적으로 제기되고 있다. 특히 해양 쓰레기와 자연 훼손은 지역 주민과 관광 산업 모두에게 중요한 과제다. 관광을 소비 활동에 머무르게 하지 않고 환경 보존과 지역 공동체의 가치로 연결할 방법이 필요했다."
          ]
        },
        "solution": {
          "summary": "환경 보호와 지역 문화를 함께 체험하는 참여형 관광",
          "body": [
            "팀원들과 함께 ESG 관점에서 제주 지역 환경 문제와 관광 산업의 관계를 분석했다. Needs/Wants, 3C, SWOT 분석으로 방향성을 정리하고, 관광객이 자연스럽게 환경 보호 활동에 참여할 수 있는 체험 프로그램을 설계했다.",
            "해양 환경 체험, 지역 문화 체험, 자연 탐방을 결합해, 방문객이 단순한 관광객을 넘어 환경 보호 활동에 함께하며 제주 자연과 지역 공동체의 가치를 직접 이해하는 체험형 관광 구조를 만들었다. 프로젝트 기획과 Figma를 활용한 발표 자료 제작을 맡았다."
          ],
          "points": [
            {
              "label": "문제 분석",
              "body": "Needs/Wants, 3C, SWOT 분석으로 ESG 관점의 제주 관광 문제를 짚고 프로젝트 방향성을 정리했다."
            },
            {
              "label": "해양 생태·환경 보호 활동",
              "body": "해양 생태 체험과 환경 보호 활동을 결합해 방문객이 제주 환경 보존에 직접 참여하도록 설계했다."
            },
            {
              "label": "지역 문화 체험·자연 탐방",
              "body": "지역 문화 체험과 자연 탐방을 통해 방문객이 제주 자연과 지역 공동체의 가치를 이해하도록 구성했다."
            }
          ]
        },
        "result": {
          "summary": "ESG 체험형 관광 모델 제안, 해커톤 장려상",
          "body": [
            "제주가치 공감 런케이션 해커톤에서 해양 생태 체험, 환경 보호 활동, 지역 문화 체험 프로그램을 결합한 ESG 관점의 체험형 관광 모델 ‘가치 제주, 고치 제주’를 제안했다. 관광을 환경 보호와 지역 문화 이해를 함께 경험하는 참여형 프로그램으로 전환하는 방향을 제시했으며, 장려상을 수상했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "해커톤"
        },
        {
          "k": "사용 도구",
          "v": "Figma"
        },
        {
          "k": "역할",
          "v": "프로젝트 기획 · 발표 자료 제작"
        }
      ],
      "media": {
        "films": [],
        "decks": [
          {
            "id": "1cVQEFDFSgZjkz9HkMvL5L2xHr8G2AabS",
            "label": "2025 · 가치 제주, 고치 제주 · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "learncation",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "hana",
      "title": "Fill The [ ], Feel MY [ ]",
      "fullTitle": "Fill The [ ], Feel My [ ]",
      "context": "제3회 하나카드 plate 디자인 공모전",
      "year": "2025",
      "discipline": "motion",
      "awards": [],
      "cover": "hana",
      "lead": "‘Fill The [ ], Feel My [ ]’는 하나카드 Plate 공모전에 출품한 카드 디자인 프로젝트로, 사용자가 자신의 취향과 감정을 카드 디자인에 반영할 수 있는 Young Premium Card 컨셉을 제안하였다.",
      "caseStudy": {
        "problem": {
          "summary": "기능 중심 카드를 젊은 세대의 표현 매체로",
          "body": [
            "기존 카드 디자인은 기능 중심으로 제작되는 경우가 많지만, 최근에는 카드 역시 개인의 취향과 라이프스타일을 반영하는 디자인 요소로 인식되고 있다. 하나카드 Plate 공모전에서 젊은 세대(Young Premium User)를 타겟으로, 카드를 단순한 결제 수단이 아닌 개인의 감정과 취향을 표현하는 오브젝트로 확장할 방법이 필요했다."
          ]
        },
        "solution": {
          "summary": "취향을 채우고 감정을 표현하는 Fill · Feel 컨셉",
          "body": [
            "사용자가 자신의 취향을 카드 디자인에 채워 넣고(Fill), 이를 통해 자신의 감정을 표현한다(Feel)는 의미를 담아 ‘Fill The [ ], Feel My [ ]’를 핵심 컨셉으로 설정했다. 다양한 그래픽 요소와 컬러로 사용자마다 다른 개성을 표현할 수 있게 하고, 카드의 디자인과 사용 경험을 연결해 감각적인 브랜드 경험을 제공하는 것을 목표로 했다.",
            "카드 디자인 경험은 취향을 채우고, 감정을 표현한 뒤, 완성된 디자인을 브랜드 경험으로 연결하는 3단계로 구성했다. Figma, Photoshop, Illustrator로 그래픽 요소를 일관된 디자인 시스템으로 정리하고, #EC91FA, #E9FC88, #05AA82 컬러 팔레트로 Young Premium User를 위한 감각적이고 개성 있는 시각 스타일을 구현했다. 프로젝트 기획과 디자인을 맡았다."
          ],
          "points": [
            {
              "label": "Fill",
              "body": "다양한 그래픽 요소와 컬러로 사용자의 취향과 라이프스타일을 카드 디자인에 채운다."
            },
            {
              "label": "Feel",
              "body": "카드에 채워 넣은 취향을 통해 사용자가 자신의 감정을 표현한다."
            },
            {
              "label": "브랜드 경험",
              "body": "완성된 카드 디자인을 사용 경험과 연결해 감각적인 브랜드 경험으로 이어간다."
            },
            {
              "label": "컬러 팔레트",
              "body": "#EC91FA, #E9FC88, #05AA82 세 가지 컬러로 Young Premium User를 위한 시각 스타일을 구성했다."
            }
          ]
        },
        "result": {
          "summary": "Young Premium Card 컨셉을 공모전에 출품",
          "body": [
            "제3회 하나카드 Plate 디자인 공모전에 사용자의 취향과 감정을 카드 디자인에 반영하는 Young Premium Card 컨셉 ‘Fill The [ ], Feel My [ ]’를 출품했다. Fill·Feel·브랜드 경험으로 이어지는 3단계 디자인 경험 구조와 그래픽·컬러 디자인 시스템을 함께 제안했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "공모전"
        },
        {
          "k": "사용 도구",
          "v": "Figma · Photoshop · Illustrator"
        },
        {
          "k": "역할",
          "v": "프로젝트 기획 · 디자인"
        }
      ],
      "media": {
        "films": [],
        "decks": [
          {
            "id": "12ZpVYoN8BwvyhsX6RDUIm6oktkmVbWpf",
            "label": "2025 · Fill The [ ], Feel My [ ] · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "hana",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "climate",
      "title": "기후동행카드 광고",
      "fullTitle": "기후동행카드 광고",
      "context": "3D모션그래픽스",
      "year": "2025",
      "discipline": "motion",
      "awards": [],
      "cover": "climate",
      "lead": "기후동행카드는 서울시에서 도입한 대중교통 무제한 이용 카드로, 대중교통 이용을 장려하고 친환경 이동을 촉진하기 위한 정책이다.",
      "caseStudy": {
        "problem": {
          "summary": "카드 디자인에만 머문 정책 카드의 인식",
          "body": [
            "기후동행카드는 대중교통 이용을 장려하고 친환경 이동을 촉진하기 위해 서울시가 도입한 대중교통 무제한 이용 카드다. 하지만 단순한 카드 디자인 중심으로 인식되는 경향이 있어, 정책 카드의 상징성과 브랜드 아이덴티티를 보다 친근하고 생동감 있게 전달할 콘텐츠가 필요했다."
          ]
        },
        "solution": {
          "summary": "해치 캐릭터가 이끄는 카드 변신 스토리 모션그래픽",
          "body": [
            "서울의 상징 캐릭터인 해치를 활용해, 캐릭터가 등장하고 기존 카드 디자인이 새로운 디자인으로 변화하는 스토리 기반 모션그래픽을 기획했다. 캐릭터 중심의 귀엽고 친근한 분위기를 유지하기 위해 안동까투리체 서체와 기후동행카드의 주요 컬러 팔레트로 디자인을 구성해 브랜드 일관성을 지켰다.",
            "스토리보드로 전체 장면 흐름을 설계한 뒤 Illustrator로 그래픽 요소를, Blender로 카드 오브젝트와 캐릭터를 포함한 3D 요소를 제작했다. After Effects에서 장면을 구성하고 모션을 설계하며, 씬 전환과 카메라 움직임으로 장면이 끊기지 않게 잇고 3D 오브젝트와 2D 그래픽이 어우러지도록 스타일과 색감을 조정했다. 기획부터 제작, 발표까지 맡았다."
          ],
          "points": [
            {
              "label": "해치 캐릭터 스토리",
              "body": "해치 캐릭터가 등장해 기존 카드가 새로운 디자인으로 변화하는 과정을 스토리로 보여줬다."
            },
            {
              "label": "브랜드 서체·컬러",
              "body": "안동까투리체 서체와 기후동행카드의 주요 컬러 팔레트로 친근한 분위기와 브랜드 일관성을 유지했다."
            },
            {
              "label": "2D·3D 제작 파이프라인",
              "body": "Illustrator로 그래픽 요소, Blender로 카드와 캐릭터 3D 요소를 만들고 After Effects에서 장면과 모션을 구성했다."
            },
            {
              "label": "끊김 없는 씬 전환",
              "body": "씬 전환과 카메라 움직임을 고려해 장면이 자연스럽게 이어지도록 모션을 설계했다."
            }
          ]
        },
        "result": {
          "summary": "해치와 카드가 함께 움직이는 광고 영상 완성",
          "body": [
            "3D 카드 오브젝트와 2D 그래픽, 해치 캐릭터의 움직임을 결합한 기후동행카드 광고 영상을 완성했다. 기존 카드에서 새로운 디자인으로 변화하는 스토리로 브랜드 메시지를 시각화하고, 친근한 캐릭터와 생동감 있는 모션으로 정책 카드의 이미지를 재해석했다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "3D모션그래픽 광고"
        },
        {
          "k": "사용 도구",
          "v": "Illustrator · Blender · After Effects · Premiere Pro"
        },
        {
          "k": "역할",
          "v": "프로젝트 기획 · 제작 · 발표"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "1ke7vtQ-1vJ5VHRHtEum8von8mesD4G5h",
            "label": "2025 · 기후동행카드 광고 · Video 01"
          }
        ],
        "decks": [
          {
            "id": "1IqdAof2B6x5eCni_IJt4WS9YDK9KPTvf",
            "label": "2025 · 기후동행카드 광고 · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "climate",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "naver",
      "title": "네이버지도 광고",
      "fullTitle": "네이버지도 광고",
      "context": "영상기초",
      "year": "2025",
      "discipline": "motion",
      "awards": [
        "학과 우수작 연합PT"
      ],
      "cover": "naver",
      "lead": "본 프로젝트는 네이버 지도 서비스를 주제로 제작한 광고 영상 프로젝트로, 실제 촬영 영상과 2D 그래픽을 결합하여 네이버 지도의 기능과 사용 경험을 직관적으로 전달하는 것을 목표로 하였다.",
      "caseStudy": {
        "problem": {
          "summary": "길찾기 도구 이상의 지도 서비스 가치 전하기",
          "body": [
            "지도 서비스는 흔히 길을 찾기 위한 도구로만 인식되지만, 실제로는 사용자가 어디로 갈지 고민하는 순간부터 활용된다. 단순한 서비스 소개를 넘어, 평점·지역 명소·주요 시설·여행지 등 네이버 지도가 제공하는 정보가 이동을 계획하고 장소를 탐색하는 실제 상황 속에서 어떤 역할을 하는지 직관적으로 보여줘야 했다."
          ]
        },
        "solution": {
          "summary": "[목적지를 위한 순간] — 실사 촬영 위 2D 지도 그래픽",
          "body": [
            "사용 경험을 바탕으로 [목적지를 위한 순간]이라는 컨셉을 설정하고, 사용자가 목적지를 찾고 서비스를 활용하는 상황을 스토리보드로 구성했다. 실제 촬영으로 서비스 사용 상황을 담은 뒤 After Effects와 Premiere Pro로 편집했다.",
            "촬영 영상 위에 네이버 지도 인터페이스를 연상시키는 2D 그래픽 요소를 더해 서비스 기능을 직관적으로 표현했고, 실사와 그래픽이 자연스럽게 어우러지도록 화면 구성과 모션을 조정했다. 영상 기획부터 촬영, 편집, 발표까지 전체 제작 과정을 수행했다."
          ],
          "points": [
            {
              "label": "[목적지를 위한 순간]",
              "body": "이동을 계획하고 장소를 탐색하는 순간에 네이버 지도가 하는 역할을 영상의 컨셉으로 삼았다."
            },
            {
              "label": "실사 촬영",
              "body": "스토리보드를 기반으로 사용자가 실제로 서비스를 활용하는 상황을 촬영했다."
            },
            {
              "label": "2D 인터페이스 그래픽",
              "body": "촬영 영상 위에 네이버 지도 인터페이스를 연상시키는 2D 그래픽을 더해 평점, 명소, 시설 등의 기능을 보여줬다."
            }
          ]
        },
        "result": {
          "summary": "학과 우수작 선정, 연합 PT 발표작으로 소개",
          "body": [
            "사용자가 목적지를 찾고 이동을 계획하는 흐름에 네이버 지도의 주요 기능을 결합한 광고 영상을 완성했다. 실제 촬영 장면 위에 2D 그래픽을 더해 서비스 사용 상황을 직관적으로 표현했으며, 영상기초 수업의 학과 우수작으로 선정되어 연합 PT에서 소개됐다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "광고 영상"
        },
        {
          "k": "사용 도구",
          "v": "After Effects · Premiere Pro"
        },
        {
          "k": "역할",
          "v": "프로젝트 기획 · 제작 · 발표"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "1c0ysNhxz2MXNm4vJok_mlwy2aZXfCs5J",
            "label": "2025 · 네이버지도 광고 · Video 01"
          }
        ],
        "decks": [
          {
            "id": "1FfVr12HGsg2W4EUkYw_diqXAORAfDtF3",
            "label": "2025 · 네이버지도 광고 · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "naver",
            "label": ""
          }
        ],
        "links": []
      }
    },
    {
      "id": "dmd",
      "title": "디미디, 우주를 닮다",
      "fullTitle": "디미디, 우주를 닮다",
      "context": "기획기초",
      "year": "2025",
      "discipline": "media",
      "awards": [],
      "cover": "dmd",
      "lead": "‘디지털미디어디자인과, 우주를 닮다’는 디지털미디어디자인과 학생들의 성향을 조사하고, 그 결과를 시각적 스토리로 표현한 모션 영상 프로젝트이다. 설문에 나타난 학생들의 특성을 MBTI 요소로 분석한 결과 INTP 성향과 유사한 경향을 발견하였고, 이를 영상 콘텐츠로 제작하였다.",
      "caseStudy": {
        "problem": {
          "summary": "학과의 성향을 대형 LED 월 콘텐츠로 풀어내기",
          "body": [
            "디지털미디어디자인과 학생들이 어떤 성향을 지녔는지 조사하고, 그 결과를 X-Space LED 월에 상영하는 것을 목표로 한 대형 화면 콘텐츠로 표현해야 했다. 설문으로 드러난 학생들의 특성을 흥미롭게 전달할 시각적 스토리와, 디지털 사이니지 환경에 맞는 화면 구성이 함께 필요했다."
          ]
        },
        "solution": {
          "summary": "낙서벽 설문 → INTP 분석 → ‘우주’ 메타포 영상",
          "body": [
            "디자인관에서 3일 동안 ‘낙서벽’ 형태의 참여형 설문을 진행해 작업 방식, 아이디어의 원천, 협업 스타일, 마감 방식 등에 대한 의견을 수집했다. 데이터를 MBTI 요소(E/I, S/N, T/F, J/P) 기준으로 그룹핑한 결과, 시각적 감각과 창의성, 새로운 미디어 표현과 기술 융합에 대한 관심, 논리적 사고와 실험적 접근을 함께 쓰는 경향이 INTP 성향과 유사하다는 결론을 도출했다.",
            "INTP의 깊은 사고, 넓은 시야, 논리적 구조, 유연한 사고를 ‘우주’ 메타포로 연결하고 스토리보드와 화면 스케치를 제작했다. 영상은 대형 LED 월 환경을 고려해 4096×1344 해상도의 와이드 비율로 설계하고, Illustrator, After Effects, Premiere Pro로 우주 공간을 배경으로 한 모션 그래픽 영상을 제작했다. 기획부터 제작, 발표까지 맡았다."
          ],
          "points": [
            {
              "label": "낙서벽 참여형 설문",
              "body": "디자인관에서 3일 동안 낙서벽 형태로 작업 방식, 아이디어의 원천, 협업 스타일, 마감 방식에 대한 의견을 모았다."
            },
            {
              "label": "MBTI 기준 분석",
              "body": "수집한 데이터를 E/I, S/N, T/F, J/P 기준으로 그룹핑해 학과 성향이 INTP와 유사하다는 결론을 냈다."
            },
            {
              "label": "‘우주’ 메타포",
              "body": "깊은 사고, 넓은 시야, 논리적 구조, 유연한 사고를 우주의 이미지로 시각화했다."
            },
            {
              "label": "4096×1344 LED 월 포맷",
              "body": "대형 LED 월 환경을 고려해 4096×1344 해상도의 와이드 비율 화면으로 설계했다."
            }
          ]
        },
        "result": {
          "summary": "학과 성향을 우주로 시각화한 사이니지 영상 완성",
          "body": [
            "디지털미디어디자인과 학생들의 성향을 INTP와 우주라는 메타포로 시각화한 디지털 사이니지 콘텐츠 영상을 완성했다. 대형 LED 월 환경에 맞춘 와이드 화면 구성과 모션 그래픽으로 학과의 창의적이고 실험적인 성향을 표현했으며, 데이터 기반 조사 결과를 시각적 스토리로 해석하는 경험을 얻었다."
          ]
        }
      },
      "details": [
        {
          "k": "프로젝트 유형",
          "v": "LED월 프로젝트"
        },
        {
          "k": "사용 도구",
          "v": "Illustrator · After Effects · Premiere Pro"
        },
        {
          "k": "역할",
          "v": "프로젝트 기획 · 제작 · 발표"
        }
      ],
      "media": {
        "films": [
          {
            "kind": "drive",
            "id": "1a9W1BuFLpUmypBl5pNI-FiQM22GfexPh",
            "label": "2025 · 디미디, 우주를 닮다 · Video 01"
          }
        ],
        "decks": [
          {
            "id": "1xl7mfpjuZwcHLrvhH9YCMnV-OqiUc0Ad",
            "label": "2025 · 디미디, 우주를 닮다 · Presentation 01"
          }
        ],
        "images": [
          {
            "src": "dmd",
            "label": ""
          }
        ],
        "links": []
      }
    }
  ],
  "featured": [
    "TimeOfExtinction",
    "Neuroscape",
    "BeyondTheCenter",
    "SilgamSujevi"
  ],
  "disciplines": [
    {
      "key": "media",
      "label": "Media Art",
      "ko": "미디어아트 · 오디오비주얼"
    },
    {
      "key": "xr",
      "label": "XR · Game",
      "ko": "XR · 인터랙티브 게임"
    },
    {
      "key": "ux",
      "label": "UX · Service",
      "ko": "서비스 기획 · UX/UI"
    },
    {
      "key": "motion",
      "label": "Motion · Campaign",
      "ko": "모션그래픽 · 캠페인"
    }
  ],
  "awards": [
    {
      "year": "2026",
      "title": "2026 Global Start-up Design Thinking Hackathon",
      "prize": "GRAND AWARD",
      "project": "MATMI",
      "id": "MATMI"
    },
    {
      "year": "2026",
      "title": "부산국제마케팅광고제 MAD STARS",
      "prize": "Gold Prize",
      "project": "Neuroscape",
      "id": "Neuroscape"
    },
    {
      "year": "2026",
      "title": "제주 바이오 AX 해커톤",
      "prize": "우수상",
      "project": "연결",
      "id": "BioAx"
    },
    {
      "year": "2026",
      "title": "2026 BCM Academy AI X Media Startup Project",
      "prize": "창의상",
      "project": "Neuroscape",
      "id": "Neuroscape"
    },
    {
      "year": "2026",
      "title": "\"Let's Go!\" COSS 스타트업 경진대회",
      "prize": "우수상",
      "project": "팀플!",
      "id": "TeamPL"
    },
    {
      "year": "2026",
      "title": "한국게임학회 × 넥슨게임즈 전국 대학생 디지털 아트 공모전",
      "prize": "특선",
      "project": "백색의 결",
      "id": null
    },
    {
      "year": "2026",
      "title": "NextGen Startup Challenge",
      "prize": "3rd Prize",
      "project": "CITY",
      "id": "CITY"
    },
    {
      "year": "2026",
      "title": "Think City Hackathon 2026",
      "prize": "Community Impact · 2nd",
      "project": "Jeonger",
      "id": "Jeonger"
    },
    {
      "year": "2025",
      "title": "제주가치 공감 런케이션 해커톤",
      "prize": "장려상",
      "project": "가치 제주, 고치 제주",
      "id": "learncation"
    }
  ],
  "experience": [
    [
      "2026",
      "XMF 페스티벌 한국 아티스트 총괄 사운드 인터랙티브 비주얼 제작",
      "XMF FESTIVAL"
    ],
    [
      "2026",
      "잠비나이 — 소멸의시간 오디오비주얼 제작",
      "KALEIDOSCOPE : 만화경"
    ],
    [
      "2026",
      "실감미디어 경진대회 본선 진출",
      "실감미디어 혁신융합대학사업단"
    ],
    [
      "2026",
      "YOUNG STARS 경진대회 본선 진출",
      "부산국제마케팅광고제"
    ],
    [
      "2026",
      "융합창업캠프 PRISM 2026",
      "실감미디어 혁신융합대학사업단"
    ],
    [
      "2026",
      "2026 공공공간 미디어아트 프로젝트 MAP",
      "화성시문화관광재단"
    ],
    [
      "2026",
      "Ai.zip⑤ TouchDesigner",
      "이요하우스"
    ],
    [
      "2026",
      "소셜리빙랩 실감미디어 PBL",
      "실감미디어 혁신융합대학사업단"
    ],
    [
      "2026",
      "제2회 이머시브 전시회",
      "계원예술대학교"
    ],
    [
      "2026",
      "XR스튜디오 쇼케이스",
      "중앙대학교"
    ],
    [
      "2026",
      "학과 우수작 연합PT",
      "유니티 프로그래밍"
    ],
    [
      "2026",
      "AI프로덕트 기획전문가 1급",
      "MainContents Co., Ltd"
    ],
    [
      "2026",
      "실감미디어 COSS 서포터즈 5기",
      "실감미디어 혁신융합대학사업단"
    ],
    [
      "2026",
      "Y-Startup 3기 '든든AI' UI/UX 팀",
      "Y-Ventures"
    ],
    [
      "2026",
      "계명대 동계 글로벌 프로그램 수료",
      "실감미디어 혁신융합대학사업단"
    ],
    [
      "2026",
      "경희대 Unity · Blender 비교과 프로그램 수료",
      "실감미디어 혁신융합대학사업단"
    ],
    [
      "2025",
      "슈퍼플레이 서포터즈 2기",
      "슈퍼플레이"
    ],
    [
      "2025",
      "학과 우수작 연합PT",
      "실감미디어기초 · 영상기초 · 3D모션그래픽스"
    ],
    [
      "2025",
      "GTQ 포토샵 · 일러스트 1급",
      "한국생산성본부"
    ]
  ],
  "education": [
    [
      "2023 — Present",
      "계원예술대학교",
      "디지털미디어디자인과"
    ],
    [
      "2022",
      "제주대학교",
      "통신공학과"
    ],
    [
      "2019 — 2021",
      "대기고등학교",
      ""
    ]
  ],
  "capabilities": [
    {
      "n": "01",
      "title": "Media Art",
      "body": "TouchDesigner 기반 실시간 오디오비주얼, 프로젝션 매핑, LED 월 콘텐츠. 공연장과 전시 공간의 스케일에서 작동하는 이미지를 만듭니다.",
      "tools": "TouchDesigner · MadMapper · Suno",
      "cover": "TimeOfExtinction-TouchDesigner",
      "pos": "30% 50%"
    },
    {
      "n": "02",
      "title": "XR & Interaction",
      "body": "Unity로 만드는 VR 교육, 모션 인식 게임, EEG 반응형 콘텐츠. 몸의 움직임과 신호가 곧 인터페이스가 되는 경험.",
      "tools": "Unity · C# · MediaPipe · Blender",
      "cover": "SilgamSujevi"
    },
    {
      "n": "03",
      "title": "UX & Service",
      "body": "문제 정의부터 서비스 구조, 화면 설계, 발표까지. 해커톤과 창업 경진대회에서 아이디어가 실제로 작동하는 방식을 설계합니다.",
      "tools": "Figma · HTML/CSS/JS · Python",
      "cover": "BioAx"
    },
    {
      "n": "04",
      "title": "Motion & Campaign",
      "body": "3D 모션그래픽 광고, 브랜드 캠페인, 카드뉴스와 숏폼 영상. 메시지를 움직임으로 번역합니다.",
      "tools": "Blender · After Effects · Premiere Pro",
      "cover": "hana",
      "pos": "72% 50%"
    }
  ]
};
