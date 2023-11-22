import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import CheckIcon from '../../assets/icons/checkIcon.svg?react';
import SubscribeButton from '../button/subscribeButton';
import Image from '../image/Image';
import Text from '../text/text';
import { User } from '../../types/api/user';

function CampInfo() {
  const [subscribed, setSubscribe] = useState(false);
  const { campId } = useParams();

  const { data: camp } = useSuspenseQuery<User>({
    queryKey: ['camp-info', campId],
    queryFn: () => fetch(`/api/users/${campId}`).then((res) => res.json()),
    gcTime: 0,
    staleTime: 0,
  });

  const handleSubscribe = () => {
    setSubscribe(!subscribed);
  };

  return (
    <div className="mb-xl flex w-full items-center gap-xl">
      <Image
        src={camp.profileUrl}
        width={100}
        height={100}
        className="rounded-full border-sm border-text-primary"
      />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col justify-evenly gap-md">
          <Text size={20} color="text-primary">
            {camp.userName}
          </Text>
          <Text size={14} color="point-lavender">
            JUST DO IT.
          </Text>
          <div className="flex gap-xl">
            <Text size={12} color="text-primary">
              포스트&nbsp;&nbsp;{camp.postCount}개
            </Text>
            <Text size={12} color="text-primary">
              구독자&nbsp;&nbsp;{camp.postCount}명
            </Text>
          </div>
        </div>
        <div>
          <SubscribeButton subscribed={subscribed} onClick={handleSubscribe}>
            <Text
              size={14}
              color={subscribed ? 'text-secondary' : 'point-blue'}
              className="flex items-center"
            >
              {subscribed ? (
                <CheckIcon className="[&>path]:stroke-text-secondary" />
              ) : (
                '+ '
              )}
              {subscribed ? '구독중' : '구독하기'}
            </Text>
          </SubscribeButton>
        </div>
      </div>
    </div>
  );
}

export default CampInfo;