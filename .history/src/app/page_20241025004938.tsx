'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ChevronDown, Play, Pause, Volume2, Menu } from 'lucide-react'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioVolume, setAudioVolume] = useState(0.5)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setAudioVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioVolume
    }
  }, [audioVolume])

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-[#FFE4E1]">
      <header className="bg-[#8B0000] text-white shadow-lg fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="#home" className="text-2xl md:text-3xl font-bold hover:text-[#FFE4E1] transition-colors">ThroPreg</Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#home" className="hover:text-[#FFE4E1] transition-colors text-lg">Home</Link>
            <Link href="#about" className="hover:text-[#FFE4E1] transition-colors text-lg">About</Link>
            <Link href="#expert-insights" className="hover:text-[#FFE4E1] transition-colors text-lg">Expert Insights</Link>
          </nav>
          <Button onClick={toggleMenu} variant="ghost" size="icon" className="md:hidden text-white">
            <Menu />
          </Button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-[#8B0000] text-white fixed w-full z-10 top-16">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="#home" className="hover:text-[#FFE4E1] transition-colors text-lg">Home</Link>
            <Link href="#about" className="hover:text-[#FFE4E1] transition-colors text-lg">About</Link>
            <Link href="#expert-insights" className="hover:text-[#FFE4E1] transition-colors text-lg">Expert Insights</Link>
          </nav>
        </div>
      )}

      <main className="pt-16">
        <section id="home" className="h-screen flex items-center justify-center bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
          <div className="text-center space-y-8 bg-[#FFF5E6]/90 p-12 rounded-lg shadow-2xl">
            <h2 className="text-5xl md:text-7xl font-bold text-[#4A0E0E]">ThroPreg</h2>
            <p className="text-xl md:text-2xl text-[#4A0E0E] max-w-2xl mx-auto">
              Empowering you with knowledge about thyroid health during pregnancy and beyond.
            </p>
            <Button onClick={scrollToContent} className="group bg-[#8B0000] hover:bg-[#6B0000] text-white text-lg px-8 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
              Learn More
              <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
        </section>

        <div ref={contentRef} className="container mx-auto px-4 py-16 space-y-16">
          <section id="about" className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-semibold text-[#4A0E0E]">Understanding Thyroid Health</h2>
              <p className="text-lg text-[#4A0E0E] leading-relaxed">
                Thyroid health is crucial, especially during pregnancy. Our thyroid gland produces hormones that regulate metabolism, 
                energy, and growth. During pregnancy, these hormones play a vital role in the development of the fetus. At ThroPreg, 
                we're dedicated to providing you with comprehensive information and support throughout your journey.
              </p>
            </div>
            <Card className="overflow-hidden bg-[#F5DEB3] border-[#8B0000] shadow-xl">
              <CardContent className="p-0">
                <div className="aspect-video bg-[#F5DEB3] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" variant="secondary" className="rounded-full w-20 h-20 bg-[#8B0000] text-white hover:bg-[#6B0000] transition-all duration-300 ease-in-out transform hover:scale-110">
                      <Play className="h-10 w-10" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Tabs defaultValue="symptoms" className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-[#FFF5E6] rounded-t-lg">
              <TabsTrigger 
                value="symptoms" 
                className="rounded-t-md px-4 py-2 text-lg transition-colors duration-200
                           data-[state=active]:bg-[#F5DEB3] data-[state=active]:text-[#4A0E0E]
                           data-[state=inactive]:bg-[#FFF5E6] data-[state=inactive]:text-[#8B0000]
                           hover:bg-[#F5DEB3] hover:text-[#4A0E0E]"
              >
                Thyroid Symptoms
              </TabsTrigger>
              <TabsTrigger 
                value="pregnancy" 
                className="rounded-t-md px-4 py-2 text-lg transition-colors duration-200
                           data-[state=active]:bg-[#8B0000] data-[state=active]:text-white
                           data-[state=inactive]:bg-[#FFF5E6] data-[state=inactive]:text-[#8B0000]
                           hover:bg-[#8B0000] hover:text-white"
              >
                Effects on Pregnancy
              </TabsTrigger>
            </TabsList>
            <TabsContent value="symptoms">
              <Card className="bg-[#FFF5E6] border-[#8B0000] shadow-lg rounded-b-lg rounded-tr-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#4A0E0E]">Common Thyroid Symptoms</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-[#4A0E0E] text-lg">Fatigue</AccordionTrigger>
                      <AccordionContent className="text-[#4A0E0E]">
                        Persistent tiredness and lack of energy, even after adequate rest. This can significantly impact daily activities and quality of life.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-[#4A0E0E] text-lg">Weight Changes</AccordionTrigger>
                      <AccordionContent className="text-[#4A0E0E]">
                        Unexplained weight gain or difficulty losing weight (hypothyroidism), or unexplained weight loss (hyperthyroidism). These changes occur despite maintaining regular eating habits.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-[#4A0E0E] text-lg">Mood Changes</AccordionTrigger>
                      <AccordionContent className="text-[#4A0E0E]">
                        Depression, anxiety, or mood swings that seem unrelated to life circumstances. Thyroid disorders can significantly affect mental health and emotional  well-being.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pregnancy">
              <Card className="bg-[#FFF5E6] border-[#8B0000] shadow-lg rounded-b-lg rounded-tr-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#4A0E0E]">Effects on Pregnancy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Increased risk of miscarriage",
                      "Preterm birth",
                      "Low birth weight",
                      "Preeclampsia",
                      "Impaired fetal brain development"
                    ].map((effect, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-3 text-[#4A0E0E]"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="h-2 w-2 bg-[#8B0000] rounded-full" />
                        <span className="text-lg">{effect}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <p className="mt-6 text-[#4A0E0E] text-lg">
                    Proper thyroid function is crucial for the healthy development of the fetus. 
                    If you're pregnant or planning to become pregnant, it's important to have your thyroid function checked.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <section id="expert-insights" className="space-y-8">
            <h2 className="text-4xl font-semibold text-center text-[#4A0E0E]">Expert Insights</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="overflow-hidden bg-[#FFF5E6] border-[#8B0000] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#4A0E0E]">Video: Dr. Jane Smith on Thyroid Health</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video bg-[#F5DEB3] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" variant="secondary" className="rounded-full w-20 h-20 bg-[#8B0000] text-white hover:bg-[#6B0000] transition-all duration-300 ease-in-out transform hover:scale-110">
                        <Play className="h-10 w-10" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#FFF5E6] border-[#8B0000] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#4A0E0E]">Audio: Expert Doctor's Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <audio ref={audioRef} src="Expert.mp3" />
                    <div className="flex items-center space-x-4">
                      <Button onClick={togglePlay} variant="outline" size="icon" className="border-[#8B0000] text-[#8B0000] hover:bg-[#FFE4E1] w-12 h-12">
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </Button>
                      <div className="flex-1 flex items-center space-x-2">
                        <Volume2 className="h-6 w-6 text-[#8B0000]" />
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={audioVolume}
                          onChange={handleVolumeChange}
                          className="w-full accent-[#8B0000]"
                        />
                      </div>
                    </div>
                    <p className="text-[#4A0E0E] text-lg">
                      highlighting key considerations and treatment approaches.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[#8B0000] text-white mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-lg">© 2023 ThroPreg. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Disclaimer: This website is for informational purposes only. Always consult with a qualified healthcare provider for medical advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
