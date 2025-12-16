// kredi/app/components/kredi-karti/Card.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { useState } from 'react'

export interface CreditCard {
  id: string;
  name: string;
  bank_name: string;
  bank_color: string;
  image_url: string | null;
  features: string[];

  interest_rate?: number | null;
  extra_advantage?: string | null;
  annual_fee?: number | null;
  apply_url: string | null;
}

interface CardProps {
    kart: CreditCard;
}

const Card = ({ kart }: CardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCardFeatures, setSelectedCardFeatures] = useState<string[]>([]);

    const handleShowAllFeatures = (features: string[]) => {
        setSelectedCardFeatures(features);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCardFeatures([]);
    };

    return (
        <>
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col h-full"
                style={{ boxShadow: kart.bank_color ? `0 4px 15px ${kart.bank_color}40` : 'none' }}>
                <div className="relative h-48 bg-gray-50 flex items-center justify-center border-b border-gray-200">
                    {kart.image_url && (
                        <Image 
                            src={kart.image_url} 
                            alt={`${kart.bank_name} ${kart.name}`}
                            layout="fill"
                            objectFit="contain"
                            className="p-4"
                            onError={(e) => {
                              e.currentTarget.src = '/images/cards/default-card.png';
                            }}
                        />
                    )}
                    <div 
                        className="absolute bottom-2 left-0 w-full p-4"
                        style={{ background: `linear-gradient(to top, ${kart.bank_color || '#000000'}E0, transparent)`}}
                    >
                        <h3 className="text-xl font-bold text-white drop-shadow-md">{kart.name}</h3>
                        <p className="text-sm text-gray-200 drop-shadow-md">{kart.bank_name}</p>
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Kart Özellikleri</h4>
                            <ul className="space-y-2 h-24 overflow-y-auto">
                                {kart.features.slice(0, 3).map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <Check className="h-5 w-5 text-[#ff3d00] mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-600">{feature}</span>
                                </li>
                                ))}
                            </ul>
                            <div className="h-6">
                                {kart.features.length > 3 && (
                                    <button onClick={() => handleShowAllFeatures(kart.features)} className="text-sm text-blue-600 hover:underline">Tümünü Gör</button>
                                )}
                            </div>
                        </div>
                        {kart.extra_advantage && (
                            <div className="mb-6 bg-orange-50 p-3 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Ekstra Avantaj</h4>
                                <p className="text-[#ff3d00] font-medium">{kart.extra_advantage}</p>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {kart.annual_fee !== undefined && (
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Yıllık Ücret</p>
                                    <p className="font-semibold text-gray-800">{kart.annual_fee ? `${kart.annual_fee} ₺` : 'Yok'}</p>
                                </div>
                            )}

                            <div>
                                <p className="text-xs text-gray-500 mb-1">Akdi Faiz Oranı</p>
                                <p className="font-semibold text-gray-800">{kart.interest_rate ? `%${kart.interest_rate}`: 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                    <Link 
                      href={kart.apply_url || '#'}
                      className="block w-full bg-[#ff3d00] hover:bg-[#e63600] text-white text-center font-bold py-3 px-4 rounded-lg transition-colors duration-300 mt-auto"
                    >
                    Hemen Başvur
                    </Link>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">Tüm Özellikler</h2>
                        <ul className="space-y-2">
                            {selectedCardFeatures.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <Check className="h-5 w-5 text-[#ff3d00] mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={closeModal}
                            className="mt-6 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Kapat
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Card;
