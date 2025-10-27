import React from 'react'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <div>
      <div class="relative bg-gray-50">
    <div class="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
        <img class="w-auto h-full" src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png" alt="" />
    </div>

    <header class="relative py-4 md:py-6">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="flex items-center justify-between">
                <div class="flex-shrink-0">
                    <a href="#" title="" class="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                        <h1 className=' text-3xl mb-0'>Debugly</h1>
                    </a>
                </div>
        </div>
        </div>
    </header>

    <section class="relative py-12 sm:py-0 lg:pt-10 lg:pb-36">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div class="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
                <div class="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
                    <div class="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                        <h1 class="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">Get meaningful feedbacks on your code</h1>

                        <div class="mt-8 lg:mt-12 lg:flex lg:items-center">
                            <div class="flex justify-center flex-shrink-0 -space-x-4 overflow-hidden lg:justify-start">
                                <img class="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="https://d33wubrfki0l68.cloudfront.net/3bfa6da479d6b9188c58f2d9a8d33350290ee2ef/301f1/images/hero/3/avatar-male.png" alt="" />
                                <img class="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="https://d33wubrfki0l68.cloudfront.net/b52fa09a115db3a80ceb2d52c275fadbf84cf8fc/7fd8a/images/hero/3/avatar-female-1.png" alt="" />
                                <img class="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="https://d33wubrfki0l68.cloudfront.net/8a2efb13f103a5ae2909e244380d73087a9c2fc4/31ed6/images/hero/3/avatar-female-2.png" alt="" />
                            </div>

                            <p class="mt-4 text-lg text-gray-900 lg:mt-0 lg:ml-4 font-pj">Join with <span class="font-bold">4600+ Developers</span> and start getting feedbacks right now</p>
                        </div>
                    </div>

                    <div class="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12">
                        <button
                            type="button"
                            title="Get feedback"
                            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj justif-center hover:bg-gray-600"
                            onClick={() => navigate('/review')}
                        >
                            Get feedback
                        </button>

                    </div>
                </div>

                <div class="xl:col-span-3">
                    <img class="w-full mx-auto scale-110" src="https://d33wubrfki0l68.cloudfront.net/29c501c64b21014b3f2e225abe02fe31fd8f3a5c/f866d/images/hero/3/illustration.png" alt="" />
                </div>
            </div>
        </div>
    </section>
</div>

    </div>
  )
}

export default Hero
