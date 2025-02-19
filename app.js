
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const items = [
  { id: 1, name: 'Гамбургер', price: 20000 },
  { id: 2, name: 'Хот-дог', price: 15000 },
  { id: 3, name: 'Кола', price: 8000 }
];

export default function FastFoodMiniApp() {
  const [cart, setCart] = useState({});

  const handleAdd = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const handleRemove = (item) => {
    setCart((prev) => {
      const updated = { ...prev, [item.id]: (prev[item.id] || 1) - 1 };
      if (updated[item.id] <= 0) delete updated[item.id];
      return updated;
    });
  };

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = items.find((i) => i.id === parseInt(id));
    return sum + (item.price * qty);
  }, 0);

  return (
    <div className='p-4 space-y-4'>
      {items.map((item) => (
        <motion.div key={item.id} whileHover={{ scale: 1.05 }}>
          <Card className='p-4 flex justify-between items-center'>
            <CardContent>
              <h2 className='text-xl font-bold'>{item.name}</h2>
              <p className='text-gray-500'>{item.price} сум</p>
            </CardContent>
            <div className='flex items-center space-x-2'>
              <Button onClick={() => handleRemove(item)}>-</Button>
              <span>{cart[item.id] || 0}</span>
              <Button onClick={() => handleAdd(item)}>+</Button>
            </div>
          </Card>
        </motion.div>
      ))}
      <div className='p-4 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold'>Итого: {total} сум</h2>
        <Button className='mt-2'>Оформить заказ</Button>
      </div>
    </div>
  );
}
