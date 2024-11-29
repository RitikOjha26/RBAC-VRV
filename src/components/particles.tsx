import { useCallback, useEffect, useState } from "react";
import { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

function Particle() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    // Add event listener to update isMobile when the window is resized
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    // Initialize the tsParticles instance (engine) here
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          // color: {
          //     value: "#0d47a1",
          // },
        },
        fpsLimit: 90,
        interactivity: {
          events: {
            onClick: {
              enable: isMobile? false : true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: isMobile ? 20 : 4, // Adjust the quantity for mobile
            },
            grab: {
              distance: isMobile ? false : 80, // Adjust the distance for mobile
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            enable: isMobile, // Enable particle connections (lines) on mobile
            distance: isMobile ? 100 : 200, // Adjust the distance for mobile
          },
          move: {
            enable: true, // Enable particle movement on mobile
            speed: isMobile ? 2 : 0.2, // Adjust the speed for mobile
          },
          number: {
            density: {
              enable: true,
              area: 1200,
            },
            value: isMobile ? 60 : 400, // Adjust the number of particles for mobile
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default Particle;