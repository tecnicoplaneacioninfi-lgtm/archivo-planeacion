import React, { useState, useEffect, useRef } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

// Base de conocimiento sobre normatividad archivística
const knowledgeBase: Record<string, string> = {
    'acuerdo 594': `El Acuerdo 594 de 2000 del Archivo General de la Nación establece las directrices para la elaboración de las Tablas de Retención Documental (TRD). 

Puntos clave:
- Define la estructura de las TRD
- Establece series y subseries documentales
- Determina tiempos de retención
- Indica disposición final de documentos`,

    'trd': `Las Tablas de Retención Documental (TRD) son instrumentos archivísticos que determinan:

1. Organización de los documentos
2. Tiempos de permanencia en cada archivo
3. Disposición final (conservación total, eliminación, selección)

Estructura: Código - Serie - Subserie - Retención - Disposición`,

    'series documentales': `Las series documentales son conjuntos de documentos producidos en desarrollo de una misma función.

Ejemplos:
- Actas
- Informes
- Correspondencia
- Contratos
- Resoluciones

Cada serie puede tener subseries que especifican el tipo de documento.`,

    'retención': `Los tiempos de retención se dividen en:

1. **Archivo de Gestión**: 2-5 años (documentos activos)
2. **Archivo Central**: 5-15 años (documentos semiactivos)
3. **Archivo Histórico**: Permanente (documentos inactivos de valor histórico)

La disposición final puede ser:
- CT: Conservación Total
- E: Eliminación
- S: Selección`,

    'ley 594': `La Ley 594 de 2000 es la Ley General de Archivos de Colombia.

Establece:
- Principios generales de la función archivística
- Obligaciones de las entidades públicas
- Gestión de documentos
- Acceso a la información
- Conservación del patrimonio documental`,

    'organización': `Para organizar un archivo según normativa:

1. Identificar series y subseries documentales
2. Elaborar TRD
3. Clasificar documentos por código
4. Foliar y rotular carpetas
5. Ubicar en archivo de gestión
6. Transferir según tiempos de retención
7. Aplicar disposición final`,

    'default': `Soy un asistente básico de normatividad archivística colombiana.

Puedo ayudarte con:
- Acuerdo 594 de 2000 (TRD)
- Ley 594 de 2000 (Ley General de Archivos)
- Series y subseries documentales
- Tiempos de retención
- Organización de archivos

Escribe palabras clave como: "acuerdo 594", "TRD", "series", "retención", "ley 594", "organización"`
};

function findBestMatch(query: string): string {
    const lowerQuery = query.toLowerCase();

    // Buscar coincidencias exactas
    for (const [key, value] of Object.entries(knowledgeBase)) {
        if (lowerQuery.includes(key)) {
            return value;
        }
    }

    // Palabras clave adicionales
    if (lowerQuery.includes('tabla') || lowerQuery.includes('retención')) {
        return knowledgeBase['trd'];
    }
    if (lowerQuery.includes('tiempo') || lowerQuery.includes('archivo')) {
        return knowledgeBase['retención'];
    }
    if (lowerQuery.includes('organiz') || lowerQuery.includes('cómo')) {
        return knowledgeBase['organización'];
    }

    return knowledgeBase['default'];
}

export const NormatividadView: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Hola! Soy tu asistente de normatividad archivística. Puedo ayudarte con consultas sobre el Acuerdo 594 de 2000, Ley 594 de 2000, Tablas de Retención Documental y organización de archivos. ¿En qué puedo ayudarte?'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputMessage.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: inputMessage
        };

        setMessages(prev => [...prev, userMessage]);
        const query = inputMessage;
        setInputMessage('');
        setIsLoading(true);

        // Simular delay de respuesta
        setTimeout(() => {
            const response = findBestMatch(query);

            const assistantMessage: Message = {
                role: 'assistant',
                content: response
            };

            setMessages(prev => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 500);
    };

    const quickQuestions = [
        '¿Qué es el Acuerdo 594 de 2000?',
        '¿Cómo se organiza una TRD?',
        '¿Qué son las series documentales?',
        '¿Cuáles son los tiempos de retención?'
    ];

    const handleQuickQuestion = (question: string) => {
        setInputMessage(question);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600 mb-6">
                <h2 className="text-2xl font-bold text-corporate-blue mb-2 flex items-center gap-2">
                    <span className="text-3xl">📜</span>
                    Asistente de Normatividad Archivística
                </h2>
                <p className="text-sm text-gray-600">
                    Consulta sobre el Acuerdo 594 de 2000, Ley General de Archivos y gestión documental
                </p>
            </div>

            {/* Chat Container */}
            <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg p-4 ${message.role === 'user'
                                        ? 'bg-corporate-blue text-white'
                                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                                    }`}
                            >
                                <div className="flex items-start gap-2">
                                    <span className="text-lg">
                                        {message.role === 'user' ? '👤' : '🤖'}
                                    </span>
                                    <div className="flex-1">
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">🤖</span>
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length === 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-xs font-semibold text-gray-600 mb-2">Preguntas frecuentes:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {quickQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickQuestion(question)}
                                    disabled={isLoading}
                                    className="text-left text-sm px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-corporate-lightBlue hover:border-corporate-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Escribe tu pregunta sobre normatividad archivística..."
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputMessage.trim()}
                            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isLoading ? 'Enviando...' : 'Enviar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
