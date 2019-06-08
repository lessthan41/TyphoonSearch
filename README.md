### 西北太平洋颱風路徑搜尋系統 TyphoonSearch

本搜尋系統介接來自日本気象庁的颱風歷史路徑資料進行彙整及處理，在使用者操作點位與環域控制下，篩選出與其搜尋點位最相似的歷史颱風排名。

#### 程式架構
程式架構主要包含兩個部分，後端資料處理運算 (使用Python) 與前端網頁資料呈現 (使用Html, JavaScript, CSS)，在前端程式架構裡，扣除 Html, CSS 檔案不看，可以把JS程式拆成幾個類別來看：   

1.  index.js    
當檔案準備好後 init()   

2.  DashboardComponent.js   
包含一個 DashboardComponent 類別 (Class)，控制整體網頁的觸發事件 (EventListener)，子類別又包含了 CardView, MapComponent 與 Request 三個類別，因此本類別控制及呼叫其他子類別的函式執行，是整體程式的大框架    

3.  CardView.js   
包含一個 CardView 類別，控制資料面板的顯示與隱藏，以及更新資料版面(Update)    

4.  MapComponent.js   
包含一個 MapComponent 類別，控制地圖的所有函數，包含使用者輸入點位、環域時繪製刪除地圖圖層，介接資料後的線資料繪製，以及切換黑夜模式時的底圖層(MapTile)切換   

5.  Request.js    
包含 Request 類別，處理資料介接 (Post & Get) 事宜，在使用者輸入時進行資料傳遞 (POST)，再透過 GET 函數得到繪製地圖線條所需的資訊，並在介接錯誤時回傳 Query Abort 的指示，使整體程式不致無法操作      


#### 使用方式   
1.  在地圖上點選欲查詢的點位    
2.  每點一點決定環域，由 Scroll Bar 決定環域大小，並且由於時間權重的影響，後者環域不能較前者小，因此有加以寫死    
3.  設定參數後按下 Query 等待資料繪製    
4.  得出資料後能夠在結果上 Hover 觀看其單一路線圖   


#### 使用套件
1.  OpenLayers    
2.  BootStrap   
3.  jQuery    

#### 參考資料
中國土木水利工程學會會刊第30期  颱風搜    
気象庁  http://www.jma.go.jp/jma/index.html      
OpenLayers  https://openlayers.org/   
BootStrap  https://getbootstrap.com/      
jQuery  https://jqueryui.com/   

