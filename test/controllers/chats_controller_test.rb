require "test_helper"

class ChatsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get chats_index_url
    assert_response :success
  end

  test "should get show" do
    get chats_show_url
    assert_response :success
  end

  test "should get new" do
    get chats_new_url
    assert_response :success
  end

  test "should get create" do
    get chats_create_url
    assert_response :success
  end

  test "should get destroy" do
    get chats_destroy_url
    assert_response :success
  end

  test "should get search" do
    get chats_search_url
    assert_response :success
  end
end
