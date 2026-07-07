import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

interface ScoreRecord {
  id: string;
  score: number;
  result: 'win' | 'draw' | 'lose';
  createdAt: { toDate: () => Date };
}

export default function ScoreHistory() {
  const { currentUser } = useAuth();
  const [records, setRecords] = useState<ScoreRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    async function fetchScores() {
      const q = query(
        collection(db, 'scores'),
        where('userId', '==', currentUser!.uid),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const snapshot = await getDocs(q);
      setRecords(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ScoreRecord)));
      setLoading(false);
    }

    fetchScores();
  }, [currentUser]);

  if (loading) return null;
  if (records.length === 0) return null;

  return (
    <div className="mt-4 w-full max-w-sm mx-auto">
      <h3 className="text-sm font-semibold text-amber-800 mb-2 text-center">我的最近 5 局</h3>
      <div className="space-y-1">
        {records.map((r) => (
          <div
            key={r.id}
            className="flex justify-between items-center text-xs bg-amber-50 border border-amber-200 rounded px-3 py-1"
          >
            <span className="text-amber-700">
              {r.createdAt?.toDate().toLocaleDateString('zh-TW')}
            </span>
            <span>{r.result === 'win' ? '贏 🎉' : r.result === 'draw' ? '平手 🤝' : '輸 💀'}</span>
            <span className={r.score >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
              ${r.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
