'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ChevronDown, Play, Pause, Volume2, Menu, Rewind, FastForward, ExternalLink } from 'lucide-react'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioVolume, setAudioVolume] = useState(0.5)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0)
    }
  }

  const handleFastForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration)
    }
  }

  const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rate = parseFloat(e.target.value)
    setPlaybackRate(rate)
    if (audioRef.current) {
      audioRef.current.playbackRate = rate
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioVolume
      audioRef.current.playbackRate = playbackRate
    }
  }, [audioVolume, playbackRate])

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
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
                  <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                  >
                    <source src="/First.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
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

          <section id="thyroid-info" className="bg-[#FFF5E6] py-16">
            <div className="container mx-auto px-4 space-y-8">
              <h2 className="text-4xl font-semibold text-center text-[#4A0E0E] mb-12">Thyroid Information</h2>
              
              <Card className="bg-white border-[#8B0000] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#4A0E0E]">What is a Thyroid gland?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-[#4A0E0E]">
                    <li>It's a small butterfly shaped organ under the Adam's Apple in the front of the neck.</li>
                    <li>It's responsible for producing and releasing hormones that regulate the body's metabolism. (Endocrine system)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#8B0000] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#4A0E0E]">What age groups can it affect?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-[#4A0E0E]">
                    <li>People of all ages</li>
                    <li>Common in adult women</li>
                    <li>However, risk increases with age</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#8B0000] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#4A0E0E]">What does the Thyroid impact?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-[#4A0E0E]">The thyroid impacts nearly every organ and function of the body, including:</p>
                  <ul className="list-disc pl-5 space-y-2 text-[#4A0E0E]">
                    <li>Metabolism</li>
                    <li>Heart rate</li>
                    <li>Body temperature</li>
                    <li>Mood</li>
                    <li>Weight</li>
                    <li>Reproductive function</li>
                    <li>Growth and development</li>
                    <li>Bone health</li>
                    <li>Digestion</li>
                  </ul>
                </CardContent>
              </Card>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="causes">
                  <AccordionTrigger className="text-[#4A0E0E] text-xl">What causes thyroid issues?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-[#4A0E0E]">
                      <li>Iodine deficiency: Areas with iodine deficiency can have a higher prevalence of thyroid problems.</li>
                      <li>Thyroid surgery</li>
                      <li>Thyroiditis</li>
                      <li>Medications such as lotion and heart medicines</li>
                      <li>Autoimmune diseases: The immune system mistakenly attacks the thyroid</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="untreated">
                  <AccordionTrigger className="text-[#4A0E0E] text-xl">What happens when thyroid is left untreated?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-[#4A0E0E]">
                      <li>Lead to high cholesterol</li>
                      <li>Heart disease</li>
                      <li>Goiter</li>
                      <li>Menstrual cycle issues</li>
                      <li>Pregnancy issues</li>
                      <li>Birth defects</li>
                      <li>Bone problems</li>
                      <li>Muscle problems</li>
                      <li>Myxedema coma</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="misdiagnosis">
                  <AccordionTrigger className="text-[#4A0E0E] text-xl">Misdiagnosis in certain countries</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-[#4A0E0E]">
                      <li>Many countries don't have proper access to healthcare</li>
                      <li>Many countries are not aware of thyroid conditions</li>
                      <li>Cultural aspects influence the way that the symptoms are reported</li>
                      <li>Misinterpretation of symptoms</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="treatment">
                  <AccordionTrigger className="text-[#4A0E0E] text-xl">How can you treat thyroid issues?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-[#4A0E0E]">
                      <li>Hypothyroidism (Under-active thyroid): medication and regular checkups</li>
                      <li>Hyperthyroidism (Overactive thyroid): medication, Radio-iodine therapy, surgery</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="text-center mt-12">
                <Link 
                  href="https://my.clevelandclinic.org/health/diseases/8541-thyroid-disease" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#8B0000] text-white px-6 py-3 rounded-full hover:bg-[#4A0E0E] transition-colors"
                >
                  Learn more about Thyroid Disease
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

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
                    <audio 
                      ref={audioRef}
                      src="/Expert.mp3"
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onEnded={() => setIsPlaying(false)}
                    />
                    <div className="flex items-center space-x-4">
                      <Button onClick={handleRewind} variant="outline" size="icon" className="border-[#8B0000] text-[#8B0000] hover:bg-[#FFE4E1]">
                        <Rewind className="h-4 w-4" />
                      </Button>
                      <Button onClick={togglePlay} variant="outline" size="icon" className="border-[#8B0000] text-[#8B0000] hover:bg-[#FFE4E1] w-12 h-12">
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </Button>
                      <Button onClick={handleFastForward} variant="outline" size="icon" className="border-[#8B0000] text-[#8B0000] hover:bg-[#FFE4E1]">
                        <FastForward className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-[#4A0E0E]">{formatTime(currentTime)}</span>
                      <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full accent-[#8B0000]"
                      />
                      <span className="text-sm text-[#4A0E0E]">{formatTime(duration)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
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
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-[#4A0E0E]">Speed:</span>
                      <select
                        value={playbackRate}
                        onChange={handlePlaybackRateChange}
                        className="bg-[#FFF5E6] border border-[#8B0000] text-[#4A0E0E] rounded-md"
                      >
                        <option value="0.5">0.5x</option>
                        <option value="1">1x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                      </select>
                    </div>
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
