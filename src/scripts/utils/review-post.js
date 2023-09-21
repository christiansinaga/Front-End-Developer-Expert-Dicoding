import Swal from 'sweetalert2';
import RestaurantsSource from '../data/restaurant-source';

const PostReview = async (restaurantId, name, review) => {
  try {
    const dataInput = {
      id: restaurantId,
      name,
      review,
    };

    // Cek apakah elemen .customer-reviews ada di DOM
    const reviewContainer = document.querySelector('.customer-reviews');

    if (reviewContainer) {
      const date = new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const newReview = `
        <div class="detail-review-item">
          <div class="review-header">
            <p class="review-name">${name}</p>
            <p class="review-date">${date}</p>
          </div>
          <div class="review-body">
            ${review}
          </div>
        </div>
      `;

      // POST review
      const reviewResponse = await RestaurantsSource.reviewResto(dataInput);

      // Append newReview to the review container
      reviewContainer.innerHTML += newReview;

      Swal.fire({
        title: 'Review Posted',
        text: 'Your review has been posted successfully',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      console.log('Review posted successfully:', reviewResponse);
    } else {
      console.error('Error: reviewContainer is null, element not found in the DOM.');
    }
  } catch (error) {
    console.error('Error posting review:', error);
    Swal.fire({
      title: 'Error',
      text: 'An error occurred while posting the review',
      icon: 'error',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }
};

export default PostReview;
