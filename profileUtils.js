function separateProfileInfo(nombrePersona) {
    const parts = nombrePersona.split('\n').map(line => line.trim());
    const name = parts[0];
  
    let pronouns = '';
    let connection = '';
    let headline = '';
  
    for (let i = 1; i < parts.length; i++) {
      const line = parts[i];
      if (line.includes('He/Him') || line.includes('She/Her') || line.includes('They/Them') || line.includes('ze/zir') || line.includes('xe/xem') || line.includes('Other')) {
        pronouns = line;
      } else if (line.includes('1st degree connection') || line.includes('2nd degree connection') || line.includes('3rd')) {
        connection = line;
      } else {
        headline = line;
      }
    }
  
    return {
      nombrePersona: name,
      pronouns: pronouns,
      connection: connection,
      headline: headline
    };
  }
  