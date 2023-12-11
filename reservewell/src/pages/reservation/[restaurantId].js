import React from 'react'
import { useRouter } from 'next/router';
import Reservation from '@/components/Reservation/Reservation';

const ReservationPage = () => {
    const router = useRouter();
    const { restaurantId } = router.query;

    return (
        <Reservation restaurantId={restaurantId} />
    )
}

export default ReservationPage