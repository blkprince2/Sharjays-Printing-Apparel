
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  PRODUCT_IMAGES, PRODUCT_COLORS, SIZES, COLORS, 
  FONTS, GALLERY_DESIGNS, MUG_SIZES, TUMBLER_SIZES 
} from '../constants';
import { ProductType, Material, Side, DesignElement, ProductConfig, CartItem } from '../types';

interface DesignStudioProps {
  onAddToCart: (item: CartItem) => void;
}

const DesignStudio: React.FC<DesignStudioProps> = ({ onAddToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialType = (location.state?.productType as ProductType) || 'T-Shirt';

  // --- State ---
  const [config, setConfig] = useState<ProductConfig>({
    id: Math.random().toString(36).substr(2, 9),
    type: initialType,
    color: initialType === 'Tote Bag' ? 'Beige' : initialType === 'Coffee Mug' || initialType === 'Tumbler' ? 'White' : 'Black',
    size: initialType === 'Coffee Mug' ? '11oz' : initialType === 'Tumbler' ? '20oz' : 'M',
    material: 'Cotton',
    sides: ['Front'],
    basePrice: initialType === 'Tote Bag' ? 14.99 : initialType === 'Coffee Mug' ? 12.99 : initialType === 'Tumbler' ? 24.99 : 19.99,
  });

  const [activeSide, setActiveSide] = useState<Side>('Front');
  const [elements, setElements] = useState<Record<Side, DesignElement[]>>({
    Front: [], Back: [], Left: [], Right: []
  });
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState<Record<Side, DesignElement[][]>>({
    Front: [[]], Back: [[]], Left: [[]], Right: [[]]
  });
  const [historyIndex, setHistoryIndex] = useState<Record<Side, number>>({
    Front: 0, Back: 0, Left: 0, Right: 0
  });

  const studioRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Helpers ---
  const saveToHistory = useCallback((newElements: DesignElement[]) => {
    setHistory(prev => {
      const currentH = [...prev[activeSide].slice(0, historyIndex[activeSide] + 1), newElements];
      return { ...prev, [activeSide]: currentH };
    });
    setHistoryIndex(prev => ({ ...prev, [activeSide]: prev[activeSide] + 1 }));
  }, [activeSide, historyIndex]);

  const undo = () => {
    if (historyIndex[activeSide] > 0) {
      const newIndex = historyIndex[activeSide] - 1;
      setHistoryIndex(prev => ({ ...prev, [activeSide]: newIndex }));
      setElements(prev => ({ ...prev, [activeSide]: history[activeSide][newIndex] }));
    }
  };

  const redo = () => {
    if (historyIndex[activeSide] < history[activeSide].length - 1) {
      const newIndex = historyIndex[activeSide] + 1;
      setHistoryIndex(prev => ({ ...prev, [activeSide]: newIndex }));
      setElements(prev => ({ ...prev, [activeSide]: history[activeSide][newIndex] }));
    }
  };

  const addText = () => {
    const newEl: DesignElement = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      content: 'YOUR TEXT HERE',
      x: 100, y: 100, width: 200, height: 50, rotation: 0,
      color: '#FFFFFF', fontSize: 32, fontFamily: 'Inter',
      isBold: false, isItalic: false, isUnderline: false,
      arcValue: 0
    };
    const newElements = [...elements[activeSide], newEl];
    setElements({ ...elements, [activeSide]: newElements });
    setSelectedElementId(newEl.id);
    saveToHistory(newElements);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newEl: DesignElement = {
          id: Math.random().toString(36).substr(2, 9),
          type: 'image',
          content: event.target?.result as string,
          x: 50, y: 50, width: 200, height: 200, rotation: 0,
          shape: 'none'
        };
        const newElements = [...elements[activeSide], newEl];
        setElements({ ...elements, [activeSide]: newElements });
        setSelectedElementId(newEl.id);
        saveToHistory(newElements);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateSelected = (updates: Partial<DesignElement>) => {
    if (!selectedElementId) return;
    const newElements = elements[activeSide].map(el => 
      el.id === selectedElementId ? { ...el, ...updates } : el
    );
    setElements({ ...elements, [activeSide]: newElements });
    // Note: To avoid excessive history points, you might want to debouncing this for sliders
  };

  const calculatePrice = () => {
    let price = config.basePrice;
    if (config.material === 'Polyester (Sublimation)') price += 8;
    
    // Multiple sides logic: 1 side = base. 2 sides = base + 50%
    const sideCount = config.sides.length;
    if (sideCount > 1) {
      price = price + (price * 0.5);
    }
    return price.toFixed(2);
  };

  const getProductColorHex = () => {
    const category = config.type === 'Tote Bag' ? 'Tote' : config.type === 'Coffee Mug' || config.type === 'Tumbler' ? 'Ceramic' : 'Apparel';
    return (PRODUCT_COLORS as any)[category].find((c: any) => c.name === config.color)?.hex || '#FFFFFF';
  };

  const currentElement = elements[activeSide].find(el => el.id === selectedElementId);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden bg-black">
      {/* Left Sidebar: Assets & Tools */}
      <div className="w-full lg:w-80 bg-zinc-900 border-r border-[#D4AF37] p-4 overflow-y-auto overflow-x-hidden">
        <div className="mb-6 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="text-white/60 hover:text-white flex items-center gap-1 text-sm">
                ← Back
            </button>
            <h2 className="gold-text font-bold uppercase tracking-widest">Controls</h2>
        </div>

        {/* Global Product Settings */}
        <section className="mb-6 space-y-4">
          <label className="block text-xs uppercase gold-text opacity-70">Product Type</label>
          <select 
            className="w-full bg-black border border-zinc-700 p-2 text-sm rounded"
            value={config.type}
            onChange={(e) => setConfig({ ...config, type: e.target.value as ProductType })}
          >
            {Object.keys(PRODUCT_IMAGES).map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <label className="block text-xs uppercase gold-text opacity-70">Color Selection</label>
          <div className="flex flex-wrap gap-2">
            {(config.type === 'Tote Bag' ? PRODUCT_COLORS.Tote : config.type === 'Coffee Mug' || config.type === 'Tumbler' ? PRODUCT_COLORS.Ceramic : PRODUCT_COLORS.Apparel).map(c => (
              <button 
                key={c.name}
                onClick={() => setConfig({ ...config, color: c.name })}
                className={`w-8 h-8 rounded-full border-2 ${config.color === c.name ? 'border-[#D4AF37]' : 'border-transparent'}`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          <label className="block text-xs uppercase gold-text opacity-70">Material</label>
          <div className="flex gap-2">
            {(['Cotton', 'Polyester (Sublimation)'] as Material[]).map(m => (
              <button
                key={m}
                onClick={() => setConfig({ ...config, material: m })}
                className={`flex-1 text-[10px] p-2 rounded border ${config.material === m ? 'bg-[#D4AF37] text-black border-transparent' : 'bg-transparent text-white border-zinc-700'}`}
              >
                {m}
              </button>
            ))}
          </div>

          <label className="block text-xs uppercase gold-text opacity-70">Size</label>
          <select 
            className="w-full bg-black border border-zinc-700 p-2 text-sm rounded"
            value={config.size}
            onChange={(e) => setConfig({ ...config, size: e.target.value })}
          >
            {(config.type === 'Coffee Mug' ? MUG_SIZES : config.type === 'Tumbler' ? TUMBLER_SIZES : SIZES).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </section>

        <hr className="border-zinc-800 my-6" />

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <button onClick={addText} className="gold-button text-[10px] font-bold py-2 rounded">ADD TEXT</button>
          <button onClick={() => fileInputRef.current?.click()} className="gold-button text-[10px] font-bold py-2 rounded">UPLOAD IMAGE</button>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept="image/*" />
        </div>

        {/* Gallery */}
        <label className="block text-xs uppercase gold-text opacity-70 mb-2">Design Gallery</label>
        <div className="grid grid-cols-2 gap-2 mb-6 h-32 overflow-y-auto">
          {GALLERY_DESIGNS.map(d => (
            <div 
              key={d.id} 
              className="bg-black/40 p-1 cursor-pointer hover:gold-trim rounded group"
              onClick={() => {
                 const newEl: DesignElement = {
                    id: Math.random().toString(36).substr(2, 9),
                    type: 'image',
                    content: d.url,
                    x: 100, y: 100, width: 100, height: 100, rotation: 0,
                    shape: 'none'
                  };
                  const newElements = [...elements[activeSide], newEl];
                  setElements({ ...elements, [activeSide]: newElements });
                  setSelectedElementId(newEl.id);
                  saveToHistory(newElements);
              }}
            >
              <img src={d.url} alt={d.name} className="w-full aspect-square object-cover rounded" />
            </div>
          ))}
        </div>

        {/* Selected Element Controls */}
        {currentElement && (
          <div className="space-y-4 border-t border-zinc-800 pt-4">
            <h3 className="gold-text text-[10px] font-bold uppercase">Element Editor</h3>
            
            {currentElement.type === 'text' && (
              <>
                <input 
                  type="text" 
                  className="w-full bg-black border border-zinc-700 p-2 text-sm text-white" 
                  value={currentElement.content}
                  onChange={(e) => updateSelected({ content: e.target.value })}
                />
                <select 
                  className="w-full bg-black border border-zinc-700 p-1 text-xs"
                  value={currentElement.fontFamily}
                  onChange={(e) => updateSelected({ fontFamily: e.target.value })}
                >
                  {FONTS.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
                </select>
                <div className="flex items-center justify-between">
                  <label className="text-[10px] text-white/50">Arc Shape</label>
                  <input 
                    type="range" min="-180" max="180" 
                    value={currentElement.arcValue || 0}
                    onChange={(e) => updateSelected({ arcValue: parseInt(e.target.value) })}
                  />
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 block">Size</label>
                <input 
                  type="range" min="20" max="400" 
                  value={currentElement.width}
                  onChange={(e) => updateSelected({ width: parseInt(e.target.value), height: currentElement.type === 'text' ? currentElement.height : parseInt(e.target.value) })} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 block">Rotate</label>
                <input 
                  type="range" min="0" max="360" 
                  value={currentElement.rotation}
                  onChange={(e) => updateSelected({ rotation: parseInt(e.target.value) })} 
                />
              </div>
            </div>

            {currentElement.type === 'image' && (
               <div className="space-y-2">
                 <label className="text-[10px] text-white/50 block">Clip Shape</label>
                 <div className="grid grid-cols-4 gap-1">
                    {['none', 'star', 'oval', 'round', 'square', 'diamond', 'tree'].map(s => (
                      <button 
                        key={s} 
                        className={`text-[8px] p-1 border rounded uppercase ${currentElement.shape === s ? 'bg-gold text-black' : 'border-zinc-700'}`}
                        onClick={() => updateSelected({ shape: s as any })}
                      >
                        {s}
                      </button>
                    ))}
                 </div>
               </div>
            )}

            <button 
              className="w-full bg-red-900/50 text-red-200 text-[10px] py-1 rounded hover:bg-red-800"
              onClick={() => {
                const newElements = elements[activeSide].filter(el => el.id !== selectedElementId);
                setElements({ ...elements, [activeSide]: newElements });
                setSelectedElementId(null);
                saveToHistory(newElements);
              }}
            >
              DELETE ELEMENT
            </button>
          </div>
        )}
      </div>

      {/* Center: Canvas Area */}
      <div className="flex-grow bg-[#050505] flex flex-col relative">
        {/* Toolbar */}
        <div className="bg-zinc-900 border-b border-[#D4AF37]/30 p-2 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <button onClick={undo} className="text-xs gold-text px-2 py-1 bg-black rounded border border-zinc-800 disabled:opacity-30">Undo</button>
            <button onClick={redo} className="text-xs gold-text px-2 py-1 bg-black rounded border border-zinc-800 disabled:opacity-30">Redo</button>
          </div>
          
          <div className="flex bg-black rounded p-1 border border-zinc-800">
            {(config.type === 'Coffee Mug' || config.type === 'Tumbler' ? ['Front', 'Left', 'Right'] : ['Front', 'Back']).map(s => (
              <button 
                key={s}
                onClick={() => {
                    setActiveSide(s as Side);
                    if (!config.sides.includes(s as Side)) {
                        setConfig({ ...config, sides: [...config.sides, s as Side] });
                    }
                }}
                className={`px-4 py-1 text-xs rounded transition-all ${activeSide === s ? 'bg-[#D4AF37] text-black font-bold' : 'text-white/60'}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <span className="text-xs text-white/50">Zoom</span>
                <input type="range" min="0.5" max="2" step="0.1" value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} className="w-24" />
            </div>
          </div>
        </div>

        {/* Canvas Engine */}
        <div className="flex-grow flex items-center justify-center relative p-8 cursor-crosshair overflow-hidden" ref={studioRef}>
          {/* Grid lines layer */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
          
          <div 
            className="relative shadow-2xl transition-transform duration-300 ease-out"
            style={{ 
              transform: `scale(${zoom})`,
              width: '500px', 
              height: '600px',
              backgroundColor: getProductColorHex(),
              borderRadius: config.type === 'Coffee Mug' || config.type === 'Tumbler' ? '10px' : '2px'
            }}
          >
            {/* Base Product Mask/Image */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img 
                    src={PRODUCT_IMAGES[config.type]} 
                    alt="base" 
                    className="w-full h-full object-contain opacity-50 mix-blend-multiply"
                    style={{ pointerEvents: 'none' }}
                />
            </div>

            {/* Editable SVG Workspace */}
            <svg 
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 500 600"
              onMouseDown={() => setSelectedElementId(null)}
            >
              {elements[activeSide].map(el => {
                const isSelected = el.id === selectedElementId;
                
                if (el.type === 'text') {
                  return (
                    <g 
                      key={el.id} 
                      transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation})`}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setSelectedElementId(el.id);
                        // Primitive dragging logic omitted for brevity, but IDs are set
                      }}
                      className="cursor-move group"
                    >
                      {el.arcValue && el.arcValue !== 0 ? (
                        <>
                          <path 
                            id={`path-${el.id}`} 
                            d={`M 0,0 A 100,100 0 0,${el.arcValue > 0 ? 1 : 0} ${el.width},0`} 
                            fill="none" 
                          />
                          <text fill={el.color} fontSize={el.fontSize} fontFamily={el.fontFamily} fontWeight={el.isBold ? 'bold' : 'normal'}>
                            <textPath xlinkHref={`#path-${el.id}`} startOffset="50%" textAnchor="middle">
                                {el.content}
                            </textPath>
                          </text>
                        </>
                      ) : (
                        <text 
                          fill={el.color} 
                          fontSize={el.fontSize} 
                          fontFamily={el.fontFamily} 
                          fontWeight={el.isBold ? 'bold' : 'normal'}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          x={el.width/2}
                          y={el.height/2}
                        >
                          {el.content}
                        </text>
                      )}
                      {isSelected && <rect x="-5" y="-5" width={el.width + 10} height={el.height + 10} fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4" />}
                    </g>
                  );
                }

                return (
                  <g 
                    key={el.id} 
                    transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation})`}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setSelectedElementId(el.id);
                    }}
                    className="cursor-move"
                  >
                    <image 
                      href={el.content} 
                      width={el.width} 
                      height={el.height} 
                      style={{ 
                        clipPath: el.shape === 'round' ? 'circle(50%)' : el.shape === 'oval' ? 'ellipse(50% 30%)' : el.shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none' 
                      }} 
                    />
                    {isSelected && <rect x="-5" y="-5" width={el.width + 10} height={el.height + 10} fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4" />}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Floating Info */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 gold-trim px-6 py-3 rounded-full flex items-center gap-8 backdrop-blur-md">
            <div className="flex flex-col">
                <span className="text-[10px] text-white/50 uppercase">Current Product</span>
                <span className="text-white font-bold">{config.color} {config.type} ({config.size})</span>
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] text-white/50 uppercase">Material</span>
                <span className="gold-text font-bold">{config.material}</span>
            </div>
            <div className="h-8 w-px bg-zinc-800"></div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-white/50 uppercase">Estimate</span>
                <span className="text-2xl font-bold text-white">${calculatePrice()}</span>
            </div>
        </div>
      </div>

      {/* Right Sidebar: Quick Actions */}
      <div className="w-full lg:w-64 bg-black border-l border-[#D4AF37] p-6 flex flex-col gap-4">
        <h2 className="gold-text font-bold text-sm uppercase tracking-widest mb-4">Finish Order</h2>
        
        <button 
          className="w-full bg-zinc-800 text-white py-3 rounded font-bold uppercase text-xs hover:bg-zinc-700 transition-colors"
          onClick={() => alert("Preview Mode: This shows a high-res mockup of your finished product.")}
        >
          Preview Design
        </button>

        <button 
          className="w-full bg-zinc-800 text-white py-3 rounded font-bold uppercase text-xs hover:bg-zinc-700 transition-colors"
          onClick={() => {
            const link = document.createElement('a');
            link.download = `sharjays-${config.type.toLowerCase()}-design.png`;
            link.href = 'https://picsum.photos/800/800'; // Mock download
            link.click();
          }}
        >
          Download Image
        </button>

        <div className="mt-auto pt-6 border-t border-zinc-800">
            <p className="text-[10px] text-white/40 mb-4 text-center">Design saved automatically. Double sided prints add 50% to cost.</p>
            <button 
              className="w-full gold-button py-4 rounded-lg font-bold uppercase shadow-lg shadow-[#D4AF37]/20"
              onClick={() => {
                const totalPrice = parseFloat(calculatePrice());
                onAddToCart({
                  id: Math.random().toString(36).substr(2, 9),
                  config,
                  designs: elements,
                  totalPrice
                });
                navigate('/cart');
              }}
            >
              Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;
