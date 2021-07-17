import { Menu as MenuIcon, Close } from '@styled-icons/material-outlined';
import { Loading } from 'components/Loading';
import { ToggleButton } from 'components/ToggleButton';
import * as Styled from './styles';
import P from 'prop-types';
import { memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useSubscription } from '@apollo/client';
import { GQL_CREATED_COMMENT } from '../../graphql/subscriptions/comment';
import { CommentNotification } from '../CommentNotification';

export function MenuMemo({ loading = false, authVar = {}, handleLogout }) {
  const [isVisible, setIsVisible] = useState(false);
  const notificationCb = useCallback((status) => {
    toast.success(`Notifications are ${status ? 'ON' : 'OFF'}`);
  }, []);
  const hideMenu = () => setIsVisible(false);
  const showMenu = () => setIsVisible(true);

  const handleNavClick = () => {
    setIsVisible(false);
  };

  useSubscription(GQL_CREATED_COMMENT, {
    onSubscriptionData({ subscriptionData }) {
      const comment = subscriptionData?.data?.createdComment;

      if (!comment) return;
      if (comment.user.id === authVar.userId) {
        toast.info('You commented your own post.');
        return;
      }

      toast.dark(<CommentNotification comment={comment} />, {
        autoClose: false,
        hideProgressBar: true,
        position: 'bottom-right',
      });
    },
  });

  return (
    <>
      {loading && <Loading loading={loading} />}
      <Styled.Container isVisible={isVisible}>
        <Styled.HideButton isVisible={isVisible} onClick={hideMenu}>
          <Close />
        </Styled.HideButton>
        <Styled.VerticalCenter>
          <Styled.Nav onClick={handleNavClick}>
            <Styled.RouterLink to="/">Home</Styled.RouterLink>

            {!!authVar?.userId && (
              <>
                <Styled.RouterLink to="/post/create">
                  Create post
                </Styled.RouterLink>
                <Styled.RouterLink to="/register">
                  Update Account
                </Styled.RouterLink>
                <Styled.RouterLink to="#" onClick={handleLogout}>
                  Logout
                </Styled.RouterLink>
              </>
            )}

            {!authVar?.userId && (
              <>
                <Styled.RouterLink to="/login">Login</Styled.RouterLink>
                <Styled.RouterLink to="/register">Register</Styled.RouterLink>
              </>
            )}
          </Styled.Nav>

          {!!authVar?.userId && (
            <ToggleButton
              title="Toggle notifications"
              onChangeFn={notificationCb}
            />
          )}
        </Styled.VerticalCenter>

        <Styled.ShowButton isVisible={isVisible} onClick={showMenu}>
          <MenuIcon />
        </Styled.ShowButton>
      </Styled.Container>
    </>
  );
}

MenuMemo.propTypes = {
  loading: P.bool,
  handleNavClick: P.func,
  authVar: P.object,
  handleLogout: P.func,
};

export const Menu = memo(MenuMemo);
