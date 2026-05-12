import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import './styles.css';

type Quiz = {
  id: string;
  title: string;
  subtitle: string;
  count: string;
  badge: string;
  url: string;
  imageUrl: string;
  shareLine: string;
  accent: string;
};

const quizzes: Quiz[] = [
  {
    id: 'global-movie',
    title: '못그린 영화퀴즈',
    subtitle: '세계 유명 영화를 발그림 명장면으로 맞히기',
    count: '30문제',
    badge: '오리지널',
    url: 'https://jmleetpl.github.io/game/',
    imageUrl: '/thumbnails/global-movie.png',
    shareLine: '전세계 명작도 발그림 앞에서는 평등합니다.',
    accent: '#ffea00',
  },
  {
    id: 'animation',
    title: '못그린 애니퀴즈',
    subtitle: '유명 애니메이션 장면을 하찮게 알아보기',
    count: '15문제',
    badge: '입문용',
    url: 'https://jmleetpl.github.io/animation-quiz/',
    imageUrl: '/thumbnails/animation.png',
    shareLine: '그림은 망했지만 추억은 멀쩡합니다.',
    accent: '#7cff8a',
  },
  {
    id: 'shinbi',
    title: '신비아파트 귀신퀴즈',
    subtitle: '귀신 이름을 발그림만 보고 맞히기',
    count: '15문제',
    badge: '한국 애니',
    url: 'https://jmleetpl.github.io/shinbi-ghost-quiz/',
    imageUrl: '/thumbnails/shinbi.png',
    shareLine: '무서워야 하는데 그림이 너무 하찮습니다.',
    accent: '#a98cff',
  },
  {
    id: 'japan-anime',
    title: '못그린 일본애니퀴즈',
    subtitle: '일본 애니 명장면을 낙서로 맞히기',
    count: '15문제',
    badge: '덕력 측정',
    url: 'https://jmleetpl.github.io/japan-anime-quiz/',
    imageUrl: '/thumbnails/japan-anime.png',
    shareLine: '작화 붕괴가 아니라 의도된 붕괴입니다.',
    accent: '#ff9ed8',
  },
  {
    id: 'korean-movie',
    title: '못그린 한국영화퀴즈',
    subtitle: '한국영화 아주 유명한 장면을 발그림으로 맞히기',
    count: '15문제',
    badge: '충무로',
    url: 'https://jmleetpl.github.io/korean-movie-quiz/',
    imageUrl: '/thumbnails/korean-movie.png',
    shareLine: '명장면을 이렇게 망쳐도 알아보면 진짜 팬입니다.',
    accent: '#74d7ff',
  },
];

function openQuiz(url: string) {
  window.location.href = url;
}

export default function App() {
  const [copied, setCopied] = useState(false);
  const totalQuestions = useMemo(
    () => quizzes.reduce((sum, quiz) => sum + Number.parseInt(quiz.count, 10), 0),
    []
  );

  const shareText =
    '못그린 퀴즈 모음 해봤냐?\n' +
    '영화/애니/귀신/한국영화 명장면을 일부러 못 그린 그림만 보고 맞히는 사이트임.\n' +
    '점수 낮아도 그림 탓 가능: https://jmleetpl.github.io/bad-quiz-hub/';

  const handleRandom = () => {
    const next = quizzes[Math.floor(Math.random() * quizzes.length)];
    openQuiz(next.url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="page">
      <section className="hero">
        <div className="window title-window">
          <div className="title-bar">
            <span>bad_quiz_collection.exe</span>
            <div className="controls" aria-hidden="true">
              <span>_</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>
          <div className="hero-body">
            <div className="hero-copy">
              <p className="eyebrow">친구한테 보내기 좋은 하찮은 퀴즈 저장소</p>
              <h1>못그린 퀴즈 모음</h1>
              <p className="lead">
                유명한 영화와 애니 장면을 일부러 엉망으로 그렸습니다.
                맞히면 뿌듯하고, 틀리면 그림 탓하면 됩니다.
              </p>
              <div className="stats" aria-label="퀴즈 통계">
                <span>{quizzes.length}개 퀴즈</span>
                <span>{totalQuestions}문제</span>
                <span>발그림 90장</span>
              </div>
              <div className="hero-actions">
                <button className="win-button primary" onClick={handleRandom}>
                  랜덤으로 망하러 가기
                </button>
                <button className="win-button" onClick={handleCopy}>
                  {copied ? '복사됨!' : '친구한테 보낼 문구 복사'}
                </button>
              </div>
            </div>
            <div className="hero-preview" aria-label="발그림 미리보기">
              {quizzes.slice(0, 4).map((quiz) => (
                <img key={quiz.id} src={quiz.imageUrl} alt={`${quiz.title} 썸네일`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="quiz-grid" aria-label="퀴즈 목록">
        {quizzes.map((quiz, index) => (
          <article className="quiz-card" key={quiz.id} style={{ '--accent': quiz.accent } as CSSProperties}>
            <div className="card-header">
              <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="badge">{quiz.badge}</span>
            </div>
            <button className="thumb-button" onClick={() => openQuiz(quiz.url)} aria-label={`${quiz.title} 시작하기`}>
              <img src={quiz.imageUrl} alt="" />
            </button>
            <div className="card-body">
              <h2>{quiz.title}</h2>
              <p>{quiz.subtitle}</p>
              <div className="meta-row">
                <span>{quiz.count}</span>
                <span>{quiz.shareLine}</span>
              </div>
            </div>
            <button className="win-button card-cta" onClick={() => openQuiz(quiz.url)}>
              바로 시작
            </button>
          </article>
        ))}
      </section>

      <section className="share-box">
        <div>
          <h2>공유용 멘트</h2>
          <p>{shareText}</p>
        </div>
        <button className="win-button" onClick={handleCopy}>
          {copied ? '클립보드에 들어감' : '멘트 복사'}
        </button>
      </section>
    </main>
  );
}
