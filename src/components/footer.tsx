import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-gray-800 mb-3">客戶服務</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>幫助中心</li>
              <li>如何購買</li>
              <li>退換貨政策</li>
              <li>聯絡我們</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-3">關於團購趣</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>關於我們</li>
              <li>加入我們</li>
              <li>隱私權政策</li>
              <li>使用者條款</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-3">付款方式</h3>
            <div className="flex flex-wrap gap-2">
              {["VISA", "Master", "JCB", "ATM", "貨到付款"].map((m) => (
                <span key={m} className="bg-white border rounded px-3 py-1 text-xs text-gray-600">
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-3">物流合作</h3>
            <div className="flex flex-wrap gap-2">
              {["黑貓宅急便", "新竹物流", "7-11", "全家", "萊爾富"].map((m) => (
                <span key={m} className="bg-white border rounded px-3 py-1 text-xs text-gray-600">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2026 團購趣 GroupBuyFun. All rights reserved.</p>
          <p className="mt-1">此為 Demo 網站，僅供展示用途</p>
        </div>
      </div>
    </footer>
  );
}
