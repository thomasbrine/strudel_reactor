// Default max values for common effects
// Values from https://strudel.cc/learn/effects/
const EFFECT_MAX_VALUES = {
    lpf: 20000,
    hpf: 20000,
    coarse: 10,
    crush: 16,
    shape: 1,
    distort: 15,
    postgain: 2, 
    delay: 1,
    room: 1,
    decay: 1,
    gain: 1,    
    default: 1
};

// Get the max value for an effect based on its name
export function getEffectMax(effectName) {
    const normalizedName = effectName.toLowerCase().trim();
    return EFFECT_MAX_VALUES[normalizedName] || EFFECT_MAX_VALUES.default;
}