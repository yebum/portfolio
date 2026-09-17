# Yebum Ko — Portfolio 2026 (Claude build)

소스: github.com/yebum/portfolio2026 (프로젝트 22개, 이미지 26장, YouTube 3편, Google Drive PDF/영상)
무드 레퍼런스: genesis.ai

---

## 1. 누가, 왜 보는가 (User)

| 방문자 | 목적 | 머무는 시간 | 반드시 얻어가야 할 것 |
|---|---|---|---|
| 채용 담당 / 스튜디오 | 역량 파악, 연락 | 30초–2분 | 무엇을 하는 사람인지(Art × Tech), 대표작 3–4개, 수상, 이메일 |
| 공모전·전시 심사 / 교수 | 특정 작업 깊게 보기 | 3–10분 | 컨셉·과정·결과, 영상, 발표 PDF |
| 협업자 (공연·전시·해커톤) | 툴·방식 확인 | 1–3분 | TouchDesigner / Unity / Figma 경험, 실제 현장 사례 |

## 2. 사용자 흐름 (Flow)

```
Landing (Hero reel)
 ├─ [View work] ──────────► Selected (대표작 4) ─► Project detail
 ├─ [Play reel] ──────────► 소멸의시간 공연 영상 모달
 ├─ scroll ─► Index (전체 22, 분야 필터 · 호버 프리뷰) ─► Project detail
 ├─ scroll ─► About (선언문 · 역량 01–04 · 팩트)
 ├─ scroll ─► Recognition (수상 표 → 해당 프로젝트로 링크) · Experience
 └─ scroll ─► Contact (메일 복사/작성, GitHub)

Project detail  #/work/<id>
 Cover → 요약 + 상세표(유형·툴·역할·수상·첨부 PDF 바로가기) → Film(클릭 시 로드)
 → Overview: Problem / Solution / Result 요약 카드 3장 → 본문 + 옆에 고정된 첨부 PDF(미리보기·열기·다운로드)
 → Images → Links → Next project ─► (loop)
 ← Index (ESC, 뒤로가기 모두 지원, 이전 스크롤 위치 복원)
```

**설계 원칙**
- 3클릭 규칙: 랜딩 → 대표작 → 영상 재생까지 2클릭.
- 수상작은 어디서든 표시(목록 뱃지, 수상 표 → 프로젝트 링크).
- 무거운 임베드(YouTube, Drive)는 포스터 클릭 후 로드 — 첫 화면 경량.
- 해시 라우팅 → 정적 호스팅(GitHub Pages) 그대로 배포 가능, 프로젝트별 공유 URL.

## 3. 웹 구조 (IA)

```
/ (index.html, SPA)
├─ #top        Hero card — Meet Yebum, 타임코드, 대표작 4 크로스페이드
├─ #selected   Selected work — 01–04 대형 카드
├─ #index      All work — 필터(All / Media Art / XR · Game / UX · Service / Motion · Campaign)
├─ #about      About — 선언문, Capabilities 01–04, Facts
├─ #recognition Awards 표 + Experience(접기) + Education
├─ #contact    Footer — "Let's make something beautiful."
└─ #/work/:id  Project detail view (22)

files
├─ index.html
├─ css/style.css
├─ js/data.js    프로젝트·수상·경력 데이터 (원본 main.js에서 추출)
├─ js/app.js     라우터, 렌더러, 인터랙션
└─ assets/img    WebP 변환본 (원본 123MB → 3.5MB, -sm 900px 썸네일)
```

## 4. 디자인 시스템 (Genesis mood)

- **색**: 페이퍼 `#FFFFFF`, 카드 `#F6F6F4`, 잉크 `#0A0A0A`, 보조 `#8A8A8A`, 선 `rgba(0,0,0,.08)`, 버튼 `#282828`. 컬러는 작업물 이미지에서만 등장.
- **타입**: Pretendard(본문·헤드라인, 400 / -0.05em 트래킹), Geist Mono(10–11px 라벨·타임코드·버튼).
  스케일: 11 mono / 14 nav / 15–17 body / 32 section H / 56–88 display.
- **형태**: 16px 라운드 카드, 카드 모서리/그리드에 1px `—` 틱 마크, 6px 라운드 다크 칩 버튼.
- **이미지**: 인덱스에서는 흑백 → 호버 시 컬러. 상세 페이지는 풀컬러.
- **모션**: 느린 켄번즈(8s), 0.8s 크로스페이드, 스크롤 리빌(opacity + 12px), `prefers-reduced-motion` 존중.

## 5. 점검 루프 (Loop checklist)

매 반복마다 브라우저에서 1440 / 768 / 375 폭으로 확인:
1. Flow — 랜딩→상세→다음 작업→인덱스 복귀가 끊김 없는가, 스크롤 복원되는가
2. Structure — 22개 프로젝트 모두 라우팅되는가, 미디어 누락 없는가, 콘솔 에러 0
3. Mood — Genesis처럼 여백·회색조·모노 라벨·틱 마크가 일관적인가, 과한 장식은 없는가
4. Readability — 한글 본문 행간/폭, 대비, 모바일 가로 스크롤 없음
5. Perf/A11y — 이미지 lazy, 임베드 지연 로드, 키보드 포커스, alt, reduced-motion

---

## 6. 점검 루프 기록 (Loop log)

| Loop | 점검 방법 | 발견 | 조치 |
|---|---|---|---|
| 1 | 1440px 전체 캡처 | 소멸의시간 사진 90° 회전(EXIF) | 변환 스크립트에 `exif_transpose` 추가, 재변환 |
| 1 | 〃 | Selected 카드 행마다 높이가 달라 정렬 깨짐 | 카드 높이를 행 단위 고정값으로 |
| 1 | 〃 | `h3` 기본 bold로 Genesis 톤과 어긋남 | weight 400 명시 |
| 1 | 〃 | 한글 수상 칩이 모노 폰트로 어색 / Prize 열 정렬 불일치 | 수상 칩은 sans 12px, 열 정렬 수정 |
| 1 | 〃 | 인덱스 ● 표시 의미 불명 | “● Awarded” 범례 추가 |
| 2 | 390px CDP 디바이스 에뮬레이션 | 가로 스크롤 발생(465px) — 수상 칩 nowrap, 필터 바 | `min-width:0`, 모바일 index-bar grid화 → 390=390 |
| 2 | 상세 1440px | 한글 키(프로젝트 유형)가 모노로 자간 벌어짐, `undefined / 22` | sans 라벨, prev/next 번호 버그 수정 |
| 2 | 플로우 자동 테스트 | ← Index 복귀 시 스크롤 0, 키보드 핸들러 예외 | rAF+timeout 레이스, Element 가드 → 4185→4185 복원 확인 |
| 3 | 데스크톱/모바일 재캡처 | 필름 포스터가 히어로와 같은 이미지 반복, 다중 필름 제목 중복 | 타이틀 전용 다크 포스터, “Film 01/02/03” |
| 3 | 〃 | 하단 틱 마크가 Contact 헤드라인과 겹침 | 텍스트 카드는 상단 틱만(`ticks--top`), 모바일은 전 카드 상단만 |
| 3 | 22개 라우트 순회 | 에러 0, 임베드 개수 = 데이터 개수, 깨진 이미지 0 | — |

### 남은 선택지 (의도적으로 제외)
- 원본의 Firebase 방명록 — 백엔드 설정이 필요해 이번 버전에서 제외.
- 다크 모드 — Genesis 무드(페이퍼 화이트)에 집중하기 위해 라이트 단일 테마.
- `SNS 준비중` 링크 — 원본에서 비어 있어 GitHub만 노출.

### v2 — Problem / Solution / Result (2026-09-17)
- 22개 프로젝트 본문을 원문(desc·sections·details·수상 목록)만 근거로 Problem / Solution / Result로 재구성 → `_work/psr/<id>.json`. 수치는 원문과 대조해 새로 만든 숫자 없음을 확인.
- 기존 하단 “Deck” 섹션을 없애고, PDF를 Overview 본문 옆 sticky 패널로 첨부(여러 개면 탭). 미리보기는 클릭 시 로드, Open ↗ / Download ↓ 제공. PDF가 없는 프로젝트(5개)는 본문 단일 컬럼.
- 모바일: 요약 카드 → 본문 → PDF 패널 순, 상세표의 “Attachment” 링크로 바로 이동. 390px 가로 스크롤 0 확인.

### v3 — Results in numbers (2026-09-17)
- 원문과 발표 PDF를 전수 확인해, 팀이 직접 검증·분석한 수치가 있는 4개 프로젝트에만 수치 섹션을 추가(인트로 바로 아래). 목표 KPI, “시연용 예시 데이터”, 단순 배경 통계는 성과가 아니므로 제외.
  - Neuroscape: 교사 20명+·담당자 5명+ 검증, Pain Score 7.6/10, 문제 공감 87%·지불 가능성 79%·Early Adopter 54.5% (발표 자료 p.9)
  - 든든AI: 50명 설문(통합 AI 툴 필요 90%·유료 의향 80%·부업 고민 70%·AI 어려움 65%), 5일 누적 조회수 1만 회+, 제작 10분 이내, 특강 24시간 내 마감·1시간 내 발행 (p.8–10)
  - CITY: 시민 85%(인용 설문), 주민 18명 인터뷰 긍정 61%(11)·중립 28%(5)·부정 11%(2) (p.3, p.31)
  - 연결(BioAx): 공공데이터 분석 73%·52.5배·3.4%, CatBoost 추천 모델 Recall@10 0.3745 (p.3, p.10)
- 형식: 큰 숫자(stats) / 가는 가로 막대(bars) / 100% 누적 막대(stack). 검정 단색 + 회색 단계, 값 직접 표기, 출처·표본 항상 병기.
- 수치화하지 않은 프로젝트: 미디어아트·모션·게임(성과 지표 없음), learncation·sds·Jeonger(자료에 자체 검증 수치 없음), TeamPL(Drive PDF가 비공개라 확인 불가).
