"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Power, Zap, RefreshCw, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemperatureData {
  temp: string;
  created_at: string;
}

interface RelayData {
  relay0: boolean;
  relay1: boolean;
  relay2: boolean;
  relay3: boolean;
  relay4: boolean;
  relay5: boolean;
  relay6: boolean;
  relay7: boolean;
}

export default function IoTDashboard() {
  const [temperature, setTemperature] = useState<TemperatureData | null>(null);
  const [relays, setRelays] = useState<RelayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    
    try {
      const [tempResponse, relayResponse] = await Promise.all([
        fetch('/api/temperature'),
        fetch('/api/relays')
      ]);


      const tempData = await tempResponse.json();
      const relayData = await relayResponse.json();

      setTemperature(tempData);
      setRelays(relayData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const toggleRelay = async (pin: number, currentState: boolean) => {
    try {
      const newState = currentState ? 0 : 1;
      await fetch('/api/set-relay', {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `pin=${pin}&state=${newState}`
      });
      
      setTimeout(() => fetchData(), 500);
    } catch (error) {
      console.error('Error toggling relay:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData(); // Check for temperature changes every 5 seconds
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const getTemperatureColor = (temp: number) => {
    if (temp <= 15) return 'from-blue-500 to-blue-600';
    if (temp <= 30) return 'from-green-500 to-green-600';
    return 'from-red-500 to-red-600';
  };

  const getTemperatureZone = (temp: number) => {
    if (temp <= 15) return { zone: 'Cold', color: 'bg-blue-100 text-blue-800', icon: '🧊' };
    if (temp <= 30) return { zone: 'Normal', color: 'bg-green-100 text-green-800', icon: '🌡️' };
    return { zone: 'Hot', color: 'bg-red-100 text-red-800', icon: '🔥' };
  };

  const tempValue = temperature ? parseFloat(temperature.temp) : 0;
  const tempZone = getTemperatureZone(tempValue);
  const gaugeRotation = Math.min((tempValue / 50) * 180, 180); // Scale to 180 degrees max

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading IoT Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            IoT Control Dashboard
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <span>Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => fetchData(true)}
                disabled={refreshing}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
              </Button>
            </div>
          </div>
        </div>

        {/* Temperature Section */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Thermometer className="w-8 h-8 text-blue-400" />
              Temperature Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-16">
              {/* Temperature Gauge */}
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 p-4 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center relative overflow-hidden">
                    <div 
                      className={cn(
                        "absolute inset-4 rounded-full bg-gradient-to-r opacity-20 transition-all duration-1000",
                        getTemperatureColor(tempValue)
                      )}
                    />
                    <div className="text-center z-10">
                      <div className="text-4xl font-bold">{tempValue}°C</div>
                      <div className="text-sm text-slate-300">Temperature</div>
                    </div>
                    {/* Gauge needle */}
                    <div 
                      className="absolute bottom-1/2 left-1/2 w-1 h-16 bg-gradient-to-t from-yellow-400 to-orange-500 transform-gpu origin-bottom transition-transform duration-1000 rounded-full shadow-lg"
                      style={{ transform: `translateX(-50%) rotate(${gaugeRotation - 90}deg)` }}
                    />
                  </div>
                </div>
                
                {/* Temperature scale */}
                <div className="flex justify-between mt-4 text-xs text-slate-400">
                  <span>0°C</span>
                  <span>25°C</span>
                  <span>50°C</span>
                </div>
              </div>

              {/* Temperature Info */}
              <div className="space-y-4 text-center md:text-left">
                <Badge className={cn("text-lg px-7 py-1 ml-4", tempZone.color)}>
                  {tempZone.icon} {tempZone.zone} Zone
                </Badge>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-blue-400 font-semibold">Cold</div>
                    <div className="text-sm text-slate-300">0-15°C</div>
                    <div className={cn("w-8 h-2 rounded-full mx-auto", tempValue <= 15 ? "bg-blue-500" : "bg-slate-600")} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-green-400 font-semibold">Normal</div>
                    <div className="text-sm text-slate-300">15-30°C</div>
                    <div className={cn("w-8 h-2 rounded-full mx-auto", tempValue > 15 && tempValue <= 30 ? "bg-green-500" : "bg-slate-600")} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-red-400 font-semibold">Hot</div>
                    <div className="text-sm text-slate-300">30-45°C</div>
                    <div className={cn("w-8 h-2 rounded-full mx-auto", tempValue > 30 ? "bg-red-500" : "bg-slate-600")} />
                  </div>
                </div>

            
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relay Control Section */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Zap className="w-8 h-8 text-yellow-400" />
              Relay Control Panel
            </CardTitle>
            <p className="text-slate-300">Control up to 8 relay switches</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, index) => {
                const isOn = relays ? relays[`relay${index}` as keyof RelayData] : false;
                return (
                <Card
                  key={`relay${index}`}
                  className={cn(
                    "transition-all duration-300 border-2 hover:scale-105",
                    isOn
                      ? "bg-green-500/20 border-green-400 shadow-green-400/20 shadow-lg"
                      : "bg-slate-800/50 border-slate-600 hover:border-slate-500"
                  )}
                >
                  <CardContent className="p-4 text-center space-y-4">
                    <div className="flex items-center justify-center">
                      <div className={cn(
                        "p-3 rounded-full transition-colors duration-300",
                        isOn ? "bg-green-500" : "bg-slate-600"
                      )}>
                        <Power className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-white">Relay {index}</h3>
                      <Badge
                        variant={isOn ? "default" : "secondary"}
                        className={cn(
                          "mt-1",
                          isOn ? "bg-green-500 text-white" : "bg-slate-600 text-slate-200"
                        )}
                      >
                        {isOn ? "ON" : "OFF"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-center">
                      <Switch
                        checked={isOn}
                        onCheckedChange={() => toggleRelay(index, isOn)}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                  </CardContent>
                </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => {
                  // Turn all relays on (0-7)
                  for (let i = 0; i < 8; i++) {
                    const isCurrentlyOn = relays ? relays[`relay${i}` as keyof RelayData] : false;
                    if (!isCurrentlyOn) {
                      setTimeout(() => toggleRelay(i, false), i * 100); // Stagger the calls
                    }
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Power className="w-4 h-4 mr-2" />
                All ON
              </Button>
              <Button
                onClick={() => {
                  // Turn all relays off (0-7)
                  for (let i = 0; i < 8; i++) {
                    const isCurrentlyOn = relays ? relays[`relay${i}` as keyof RelayData] : false;
                    if (isCurrentlyOn) {
                      setTimeout(() => toggleRelay(i, true), i * 100); // Stagger the calls
                    }
                  }
                }}
                variant="destructive"
              >
                <Power className="w-4 h-4 mr-2" />
                All OFF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>IoT Project Dashboard • ESP32 + Relay Control System</p>
        </div>
      </div>
    </div>
  );
}