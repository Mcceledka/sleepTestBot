import React, { useState, useEffect } from 'react';
import { init } from '@tma.js/sdk';

function App() {
  const [count, setCount] = useState(0);
  const [userName, setUserName] = useState('');
  const [isTelegram, setIsTelegram] = useState(false);

  // 👇 ИНИЦИАЛИЗАЦИЯ Telegram Mini App
  useEffect(() => {
    // Проверяем, запущено ли в Telegram
    if (window.Telegram?.WebApp) {
      setIsTelegram(true);
      const tg = window.Telegram.WebApp;
      
      // Раскрываем на весь экран
      tg.expand();
      
      // Получаем данные пользователя
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUserName(user.first_name || 'друг');
      }
      
      // Можно менять тему Telegram
      tg.setHeaderColor('#4CAF50');
      tg.setBackgroundColor('#f5f5f5');
      
      // Показываем кнопку внизу Telegram
      tg.MainButton.setText(`Счёт: ${count}`).show();
      tg.MainButton.onClick(() => {
        tg.sendData(JSON.stringify({ count }));
        tg.showAlert(`Отправлено в бота: ${count}`);
      });
      
      // Обновляем текст кнопки при изменении счётчика
      return () => tg.MainButton.offClick();
    }
  }, [count]);

  // 👇 Функция для отправки данных в Telegram
  const sendToTelegram = () => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Отправляем данные боту
      tg.sendData(JSON.stringify({ 
        action: 'counter_update', 
        count: count 
      }));
      
      // Показываем уведомление в Telegram
      tg.showAlert(`Текущий счёт: ${count}`);
      
      // Можно закрыть Mini App
      // tg.close();
    } else {
      alert('Запусти в Telegram для полного функционала!');
    }
  };

  return (
    <div style={{
      padding: "30px",
      textAlign: "center",
      backgroundColor: isTelegram ? '#f5f5f5' : '#fff',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: isTelegram ? '#4CAF50' : '#333' }}>
        {isTelegram ? `🎮 Привет, ${userName}!` : '🎮 Простой счётчик'}
      </h1>
      
      <p style={{ color: '#666', marginBottom: '30px' }}>
        {isTelegram ? 'Запущено в Telegram Mini App 🚀' : 'Запусти в Telegram для полного функционала'}
      </p>
      
      <div style={{
        fontSize: "80px",
        fontWeight: "bold",
        color: count >= 10 ? "#4CAF50" : "#2196F3",
        margin: "30px 0",
        textShadow: "2px 2px 5px rgba(0,0,0,0.1)"
      }}>
        {count}
      </div>
      
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "15px 25px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
          ➕ +1
        </button>
        
        <button
          onClick={() => setCount(count - 1)}
          style={{
            padding: "15px 25px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer"
          }}>
          ➖ -1
        </button>
        
        <button
          onClick={() => setCount(0)}
          style={{
            padding: "15px 25px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer"
          }}>
          🔄 Сброс
        </button>
      </div>
      
      {isTelegram && (
        <button
          onClick={sendToTelegram}
          style={{
            padding: "15px 30px",
            backgroundColor: "#0088cc",
            color: "white",
            border: "none",
            borderRadius: "25px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "20px",
            boxShadow: "0 4px 10px rgba(0,136,204,0.3)"
          }}>
          📨 Отправить в Telegram ({count})
        </button>
      )}
      
      <div style={{
        marginTop: "40px",
        padding: "20px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}>
        <p style={{ color: '#888' }}>
          {isTelegram ? '✅ Работает внутри Telegram' : '❌ Запусти через Telegram бота'}
        </p>
        <p style={{ fontSize: '14px', color: '#aaa', marginTop: '10px' }}>
          Простое React-приложение как Telegram Mini App
        </p>
      </div>
    </div>
  );
}

export default App;