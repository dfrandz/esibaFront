
function getToken(): string | null {
    // @ts-ignore
    const token = JSON.parse(localStorage.getItem('token'));
    if (typeof token === 'string') {
        return token;
    } else {
        return null;
    }
}

function deleteToken() {
    // @ts-ignore
    const expire_date = JSON.parse(localStorage.getItem('tokenExpiration')) as string;
    const tokenExpiration = convertToTime(expire_date);
    let is_auth = true;
    const now = new Date().getTime();
    if (now - tokenExpiration >= 8 * 60 * 60 * 1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        console.log('Le jeton d\'authentification a été supprimé.');
        is_auth = false;
    }
    return is_auth;
}

function convertToTime(dateString: string) {
    const dateObj = new Date(dateString);
    return dateObj.getTime();
}


function getExpires() {
    var d = new Date();

    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    return expires;
}

function calculateTimeDifference(startTime: Date, endTime: Date) {
    // Convertir les heures de départ et d'arrivée en nombres de minutes
    const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();
    // Calculer la différence en nombres de minutes
    let timeDifference = endMinutes - startMinutes;
    // Si la différence est négative, cela signifie que l'heure de fin est le lendemain
    // Donc on ajoute 1440 (nombre de minutes dans une journée) pour obtenir la différence correcte
    if (timeDifference < 0) {
        timeDifference += 1440;
    }
    // Convertir la différence en heures et minutes et retourner le résultat
    const hours = Math.floor(timeDifference / 60);
    let minutes = timeDifference % 60;
    if (minutes == 0) {
        minutes = hours * 60;
    }
    if (hours > 0) {
        minutes += hours * 60;
    }
    return { hours, minutes };
}

export {
    getExpires, calculateTimeDifference, getToken, deleteToken,
    convertToTime
};
